namespace Timorya.Domain.Users;

public sealed class UserOrganization
{
    public UserOrganization() { }

    public UserOrganization(User user, Organization organization, Role role)
    {
        User = user;
        Organization = organization;
        Role = role;
    }

    public int UserId { get; private init; }
    public int OrganizationId { get; private init; }
    public int RoleId { get; private set; }

    public User User { get; private init; }
    public Organization Organization { get; private init; }
    public Role Role { get; private set; }

    public static UserOrganization Create(User user, Organization organization, Role role)
    {
        return new UserOrganization(user, organization, role);
    }

    public void UpdateRole(Role newRole)
    {
        Role = newRole;
        RoleId = newRole.Id;
    }
}
