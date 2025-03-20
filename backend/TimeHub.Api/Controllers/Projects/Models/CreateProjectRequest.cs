namespace TimeHub.Api.Controllers.Projects.Models;

public class CreateProjectRequest
{
    public string Name { get; set; }
    public string Color { get; set; }
    public bool IsPublic { get; set; }
    public bool IsBillable { get; set; }
    public decimal? HourlyRate { get; set; }
    public int? ClientId { get; set; }
}
