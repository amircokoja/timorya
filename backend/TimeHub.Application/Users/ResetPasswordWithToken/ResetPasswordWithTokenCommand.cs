using MediatR;
using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.Users.ResetPasswordWithToken;

public sealed record ResetPasswordWithTokenCommand(string Token, string NewPassword)
    : ICommand<Unit>;
