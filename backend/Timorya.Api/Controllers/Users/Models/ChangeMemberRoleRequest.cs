namespace Timorya.Api.Controllers.Users.Models;

public class ChangeMemberRoleRequest
{
    public int? UserId { get; set; }
    public int? InvitationId { get; set; }
    public int NewRoleId { get; set; }
}
