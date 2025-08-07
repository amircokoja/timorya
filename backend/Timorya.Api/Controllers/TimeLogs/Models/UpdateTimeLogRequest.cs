namespace Timorya.Api.Controllers.TimeLogs.Models;

public class UpdateTimeLogRequest
{
    public string Description { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public int? ProjectId { get; set; }
    public int Seconds { get; set; }
}
