namespace TimeHub.Api.Controllers.Public.Models;

public class ContactFormRequest
{
    public string Email { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
}
