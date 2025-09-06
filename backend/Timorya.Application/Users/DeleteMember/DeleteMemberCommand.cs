using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.DeleteMember;

public sealed record DeleteMemberCommand(int? UserId, int? InvitationId) : ICommand<Unit>;
