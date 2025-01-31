using TimeHub.Application.Users.LoginUser;

namespace TimeHub.Application.Users.LoginUserWithRefreshToken;

public sealed record LoginUserWithRefreshTokenCommand(string RefreshToken)
    : Abstractions.Messaging.ICommand<LoginUserResponse>;
