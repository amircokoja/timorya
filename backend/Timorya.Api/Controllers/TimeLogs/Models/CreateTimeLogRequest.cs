namespace Timorya.Api.Controllers.TimeLogs.Models;

public class CreateTimeLogRequest
{
    public string Description { get; set; }
    public int? ProjectId { get; set; }
}
