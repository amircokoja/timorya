using Timorya.Domain.Abstractions;
using Timorya.Domain.Clients;
using Timorya.Domain.TimeLogs;

namespace Timorya.Domain.Users;

public sealed class Organization : Entity
{
    private Organization() { }

    public OrganizationName Name { get; private set; }
    public bool IsPersonalWorkspace { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public ICollection<UserOrganization> UserOrganizations { get; private set; }
    public ICollection<User> Users { get; private set; }
    public ICollection<Client> Clients { get; private set; }
    public ICollection<TimeLog> TimeLogs { get; private set; }
    public ICollection<MemberInvitation> MemberInvitations { get; private set; }

    public static Organization Create(string name, bool isPersonalWorkspace)
    {
        var organizationName = new OrganizationName(name);

        return new Organization
        {
            Name = organizationName,
            IsPersonalWorkspace = isPersonalWorkspace,
        };
    }

    public void UpdateName(string name)
    {
        var organizationName = new OrganizationName(name);
        Name = organizationName;
    }
}
