using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.RegisterUser;

public sealed record RegisterUserCommand(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    string ConfirmPassword
) : ICommand<RegisterUserResponse>;
