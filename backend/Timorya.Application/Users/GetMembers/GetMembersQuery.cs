using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.GetMembers;

public sealed record GetMembersQuery() : IQuery<IReadOnlyList<MemberResponse>>;
