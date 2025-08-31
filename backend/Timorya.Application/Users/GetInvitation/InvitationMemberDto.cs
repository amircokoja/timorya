using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetInvitation;

public sealed class InvitationMemberDto
{
    public string Email { get; set; }
    public string Organization { get; set; }

    public static InvitationMemberDto FromEntity(MemberInvitation invitation)
    {
        return new InvitationMemberDto
        {
            Email = invitation.Email,
            Organization = invitation.Organization.Name.Value,
        };
    }
}
