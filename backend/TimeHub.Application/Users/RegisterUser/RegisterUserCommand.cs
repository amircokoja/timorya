using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.Users.RegisterUser;

public sealed record RegisterUserCommand(
    string FirstName,
    string LastName,
    string Email,
    string Role,
    string Password,
    string ConfirmPassword
) : ICommand<RegisterUserResponse>;
