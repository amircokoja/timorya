using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.ForgotPassword;

public sealed record ForgotPasswordCommand(string Email) : ICommand<Unit>;
