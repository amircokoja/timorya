namespace Timorya.Application.Users.GetRoles;

public sealed class RoleResponse(int id, string name)
{
    public int Id { get; } = id;
    public string Name { get; } = name;
}
