using TimeHub.Domain.Abstractions;

namespace TimeHub.Domain.Users;

public sealed class Organization : Entity
{
    private Organization() { }

    public OrganizationName Name { get; private set; }
    public ICollection<UserOrganization> UserOrganizations { get; private set; }
    public ICollection<User> Users { get; private set; }

    public static Organization Create(FirstName usersFirstName)
    {
        var name = new OrganizationName(usersFirstName.Value + "'s Organization");

        return new Organization { Name = name };
    }
}
