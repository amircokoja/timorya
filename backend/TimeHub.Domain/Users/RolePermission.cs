namespace TimeHub.Domain.Users;

public sealed class RolePermission(int roleId, int permissionId)
{
    public int RoleId { get; init; } = roleId;
    public Role Role { get; init; }
    public int PermissionId { get; init; } = permissionId;
    public Permission Permission { get; init; }

    public static RolePermission Create(Role role, Permission permission)
    {
        return new RolePermission(role.Id, permission.Id);
    }
}
