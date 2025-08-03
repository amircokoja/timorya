using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Common.Configuration;
using TimeHub.Application.Common.Interfaces;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Shared;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Users.ForgotPassword;

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
