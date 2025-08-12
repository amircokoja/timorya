using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.GoogleOAuth;

public sealed record GoogleOAuthCommand(string Code) : ICommand<string>;
