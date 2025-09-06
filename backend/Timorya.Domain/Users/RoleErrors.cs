using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Users;

public static class RoleErrors
{
    public static readonly Error NotFound = new("Role.NotFound", "Role not found");
}
