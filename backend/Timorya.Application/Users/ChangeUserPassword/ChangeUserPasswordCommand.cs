using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.ChangeUserPassword;

public sealed record ChangeUserPasswordCommand(
    string OldPassword,
    string NewPassword,
    string ConfirmPassword
) : ICommand<Unit>;
