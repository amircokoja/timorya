using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Users;

public class MemberInvitation : Entity
{
    public MemberInvitation() { }

    public string Token { get; private set; }
    public string Email { get; private set; }
    public int OrganizationId { get; private set; }
    public Organization Organization { get; private set; }
    public int RoleId { get; private set; }
    public Role Role { get; private set; }
    public int InvitedByUserId { get; private set; }
    public User InvitedByUser { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public MemberInvitation(string email, Role role, User invitedByUser)
    {
        Token = Guid.NewGuid().ToString();
        Email = email;
        Organization = invitedByUser.CurrentOrganization!;
        Role = role;
        InvitedByUser = invitedByUser;
        CreatedAt = DateTime.UtcNow;
    }

    public void UpdateRole(Role newRole)
    {
        Role = newRole;
        RoleId = newRole.Id;
    }
}
