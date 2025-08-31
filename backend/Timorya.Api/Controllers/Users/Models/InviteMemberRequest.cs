namespace Timorya.Api.Controllers.Users.Models;

public class InviteMemberRequest
{
    public string Email { get; set; }
    public int RoleId { get; set; }
}
