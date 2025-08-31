using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.GetInvitation;

public sealed record GetInvitationQuery(string Token) : IQuery<InvitationMemberDto>;
