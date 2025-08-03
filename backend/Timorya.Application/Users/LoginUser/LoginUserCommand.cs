using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.LoginUser;

public sealed record LoginUserCommand(string Email, string Password) : ICommand<LoginUserResponse>;
