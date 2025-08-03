using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Common.Configuration;
using Timorya.Application.Common.Interfaces;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Shared;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.ForgotPassword;

internal sealed class ForgotPasswordCommandHandler(
    IApplicationDbContext context,
    IEmailService emailService,
    IEmailTemplateService emailTemplateService,
    IOptions<JwtSettings> options
) : ICommandHandler<ForgotPasswordCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IEmailService _emailService = emailService;
    private readonly IEmailTemplateService _emailTemplateService = emailTemplateService;
    private readonly JwtSettings _jwtSettings = options.Value;

    public async Task<Result<Unit>> Handle(
        ForgotPasswordCommand request,
        CancellationToken cancellationToken
    )
    {
        var dbUser = await _context
            .Set<User>()
            .Include(u => u.UserOrganizations)
            .FirstOrDefaultAsync(u => u.Email == new Email(request.Email), cancellationToken);

        if (dbUser is null)
        {
            return Result.Failure<Unit>(UserErrors.NotFound);
        }

        var token = new ForgotPasswordToken(dbUser);

        _context.Set<ForgotPasswordToken>().Add(token);
        await _context.SaveChangesAsync(cancellationToken);

        var resetLink = token.GenerateLink(_jwtSettings.Audience);

        var email = _emailTemplateService.ForgotPassword(request.Email, resetLink);
        await _emailService.SendEmailAsync(email, cancellationToken);

        return Result.Success(Unit.Value);
    }
}
