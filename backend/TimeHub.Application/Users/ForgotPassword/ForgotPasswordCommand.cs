using MediatR;
using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.Users.ForgotPassword;

public sealed record ForgotPasswordCommand(string Email) : ICommand<Unit>;
