using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.Users.LoginUser;

public sealed record LoginUserCommand(string Email, string Password) : ICommand<LoginUserResponse>;
