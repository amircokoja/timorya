namespace TimeHub.Api.Controllers.Clients.Models;

public class CreateClientRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string Currency { get; set; }
    public string Color { get; set; }
}
