using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Errors;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Shared;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Users.RegisterUser;

internal sealed class RegisterUserCommandHandler(IApplicationDbContext context)
    : ICommandHandler<RegisterUserCommand, RegisterUserResponse>
{
    private readonly IApplicationDbContext _context = context;

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

        return new RegisterUserResponse(user);
    }
}
