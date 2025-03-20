using TimeHub.Domain.Clients;
using TimeHub.Domain.Projects;

namespace TimeHub.Application.Projects.Shared;

public class ProjectDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public bool IsPublic { get; set; }
    public bool IsBillable { get; set; }
    public decimal? HourlyRate { get; set; }
    public int? ClientId { get; set; }
    public string ClientName { get; set; } = string.Empty;

    public static ProjectDto From(Project project, Client? client)
    {
        return new ProjectDto
        {
            Id = project.Id,
            Name = project.Name.Value,
            Color = project.Color.Value,
            IsPublic = project.IsPublic,
            IsBillable = project.IsBillable,
            HourlyRate = project.HourlyRate,
            ClientId = project.ClientId,
            ClientName = client?.GetFullName() ?? string.Empty,
        };
    }
}
