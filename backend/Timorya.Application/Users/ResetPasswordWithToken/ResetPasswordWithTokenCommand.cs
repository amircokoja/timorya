using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.ResetPasswordWithToken;

public sealed record ResetPasswordWithTokenCommand(string Token, string NewPassword)
    : ICommand<Unit>;
