namespace Timorya.Api.Controllers.Users.Models;

public class CreateOrganizationRequest
{
    public string Name { get; set; }
    public bool IsPersonalWorkspace { get; set; }
}
