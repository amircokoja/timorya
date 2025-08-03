namespace Timorya.Api.Controllers.Clients.Models;

public class UpsertClientRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string Currency { get; set; }
    public string Color { get; set; }
}
