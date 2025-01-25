using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Errors;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Users.RegisterUser;

internal sealed class RegisterUserCommandHandler(
    IUserRepository userRepository,
    IOrganizationRepository organizationRepository,
    IUnitOfWork unitOfWork
) : ICommandHandler<RegisterUserCommand, RegisterUserResponse>
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IOrganizationRepository _organizationRepository = organizationRepository;

    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<Result<RegisterUserResponse>> Handle(
        RegisterUserCommand request,
        CancellationToken cancellationToken
    )
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

        var firstName = new FirstName(request.FirstName);

        var organization = Organization.Create(firstName);

        var user = User.Create(
            firstName,
            new LastName(request.LastName),
            new Email(request.Email),
            passwordHashResult.Value,
            organization
        );

        _organizationRepository.Add(organization);
        _userRepository.Add(user, organization);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new RegisterUserResponse(user);
    }
}
