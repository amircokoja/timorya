using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.GetRoles;

public sealed record GetRolesQuery() : IQuery<IReadOnlyList<RoleResponse>>;
