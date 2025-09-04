using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetMembers;

public sealed class MemberResponse
{
    public int? UserId { get; private set; }
    public int? InvitationId { get; private set; }
    public string? Name { get; private set; }
    public string Email { get; private set; }
    public string Role { get; private set; }
    public string Type { get; private set; }

    public static MemberResponse FromUser(UserOrganization userOrganization)
    {
        return new MemberResponse
        {
            UserId = userOrganization.User.Id,
            Name =
                userOrganization.User.FirstName.Value + " " + userOrganization.User.LastName.Value,
            Email = userOrganization.User.Email.Value,
            Role = userOrganization.Role.Name,
            Type = "User",
        };
    }

    public static MemberResponse FromInvitation(MemberInvitation invitation)
    {
        return new MemberResponse
        {
            UserId = null,
            Name = null,
            InvitationId = invitation.Id,
            Email = invitation.Email,
            Role = invitation.Role.Name,
            Type = "Invitation",
        };
    }
}
