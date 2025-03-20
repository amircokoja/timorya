using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Clients;
using TimeHub.Domain.Shared;

namespace TimeHub.Domain.Projects;

public sealed class Project : Entity
{
    private Project() { }

    public ProjectName Name { get; private set; }
    public Color Color { get; private set; }
    public bool IsPublic { get; set; }
    public bool IsBillable { get; set; }
    public decimal? HourlyRate { get; private set; }

    // foreign key
    public int? ClientId { get; private set; }
    public Client Client { get; private set; }
}
