using Timorya.Application.Users.LoginUser;

namespace Timorya.Application.Users.LoginUserWithRefreshToken;

public sealed record LoginUserWithRefreshTokenCommand(string RefreshToken)
    : Abstractions.Messaging.ICommand<LoginUserResponse>;
