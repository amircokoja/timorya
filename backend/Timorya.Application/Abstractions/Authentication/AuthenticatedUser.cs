namespace Timorya.Application.Abstractions.Authentication;

public class AuthenticatedUser
{
    public int UserId { get; set; }
    public int CurrentOrganizationId { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
}
