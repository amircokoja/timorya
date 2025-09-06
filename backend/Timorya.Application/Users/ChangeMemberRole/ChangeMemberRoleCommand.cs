using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.ChangeMemberRole;

public sealed record ChangeMemberRoleCommand(int? UserId, int? InvitationId, int NewRoleId)
    : ICommand<Unit>;
