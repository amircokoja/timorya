using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Common.Interfaces;
using TimeHub.Application.Errors;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Shared;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Users.RegisterUser;

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

        if (request.Password != request.ConfirmPassword)
        {
            return Result.Failure<RegisterUserResponse>(UserApplicationErrors.PasswordMismatch);
        }

        var passwordHashResult = Password.Create(request.Password);

        if (passwordHashResult.IsFailure)
        {
            return Result.Failure<RegisterUserResponse>(passwordHashResult.Error);
        }

        var firstName = new FirstName(request.FirstName);

        var organization = Organization.Create(firstName);

        var user = User.Create(
            firstName,
            new LastName(request.LastName),
            new Email(request.Email),
            passwordHashResult.Value,
            organization
        );

        _context.Set<Organization>().Add(organization);
        _context.Set<Role>().Attach(Role.Owner);
        user.AddToOrganization(organization, Role.Owner);
        _context.Set<User>().Add(user);

        await _context.SaveChangesAsync(cancellationToken);

        // Move to event handler
        try
        {
            var emailValue = _emailTemplateService.NewUserEmailContent(
                request.Email,
                request.FirstName + " " + request.LastName
            );

            await _emailService.SendEmailAsync(emailValue, cancellationToken);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to send email: {ex.Message}");
        }

        return new RegisterUserResponse(user);
    }
}
