using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Common.Interfaces;
using Timorya.Application.Errors;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Shared;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.RegisterUser;

internal sealed class RegisterUserCommandHandler(
    IApplicationDbContext context,
    IEmailService emailService,
    IEmailTemplateService emailTemplateService
) : ICommandHandler<RegisterUserCommand, RegisterUserResponse>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IEmailService _emailService = emailService;
    private readonly IEmailTemplateService _emailTemplateService = emailTemplateService;

    public async Task<Result<RegisterUserResponse>> Handle(
        RegisterUserCommand request,
        CancellationToken cancellationToken
    )
    {
        var dbUser = await _context
            .Set<User>()
            .Include(u => u.UserOrganizations)
            .FirstOrDefaultAsync(u => u.Email == new Email(request.Email), cancellationToken);

        if (dbUser is not null)
        {
            return Result.Failure<RegisterUserResponse>(UserApplicationErrors.EmailAlreadyExists);
        }

        Password password = Password.Empty;
        if (!request.IsOAuth)
        {
            if (request.Password != request.ConfirmPassword)
            {
                return Result.Failure<RegisterUserResponse>(UserApplicationErrors.PasswordMismatch);
            }

            var passwordHashResult = Password.Create(request.Password);

            if (passwordHashResult.IsFailure)
            {
                return Result.Failure<RegisterUserResponse>(passwordHashResult.Error);
            }

            password = passwordHashResult.Value;
        }

        var firstName = new FirstName(request.FirstName);

        var user = User.Create(
            firstName,
            new LastName(request.LastName),
            new Email(request.Email),
            password
        );

        _context.Set<User>().Add(user);

        await _context.SaveChangesAsync(cancellationToken);

        // Move to event handler
        var emailValue = _emailTemplateService.NewUserEmailContent(
            request.Email,
            request.FirstName + " " + request.LastName
        );

        await _emailService.SendEmailAsync(emailValue, cancellationToken);

        return new RegisterUserResponse(user);
    }
}
