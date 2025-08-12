using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.LoginUser;

public sealed record LoginUserCommand(string Email, string Password, bool IsOAuth = false)
    : ICommand<LoginUserResponse>;
