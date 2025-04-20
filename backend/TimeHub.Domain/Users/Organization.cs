using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Clients;
using TimeHub.Domain.Shared;
using TimeHub.Domain.TimeLogs;

namespace TimeHub.Domain.Users;

public sealed class Organization : Entity
{
    private Organization() { }

    public OrganizationName Name { get; private set; }
    public ICollection<UserOrganization> UserOrganizations { get; private set; }
    public ICollection<User> Users { get; private set; }
    public ICollection<Client> Clients { get; private set; }
    public ICollection<TimeLog> TimeLogs { get; private set; }

    public static Organization Create(FirstName usersFirstName)
    {
        var name = new OrganizationName(usersFirstName.Value + "'s Organization");

        return new Organization { Name = name };
    }
}
