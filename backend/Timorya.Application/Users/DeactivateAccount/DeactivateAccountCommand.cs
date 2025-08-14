using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.DeactivateAccount;

public sealed record DeactivateAccountCommand() : ICommand<Unit>;
