using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.AcceptInvitation;

public sealed record AcceptInvitationCommand(string Token) : ICommand<Unit>;
