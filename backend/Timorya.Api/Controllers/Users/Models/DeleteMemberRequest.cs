namespace Timorya.Api.Controllers.Users.Models;

public class DeleteMemberRequest
{
    public int? UserId { get; set; }
    public int? InvitationId { get; set; }
}
