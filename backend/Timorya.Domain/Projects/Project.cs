using Timorya.Domain.Abstractions;
using Timorya.Domain.Clients;
using Timorya.Domain.Shared;
using Timorya.Domain.TimeLogs;
using Timorya.Domain.Users;

namespace Timorya.Domain.Projects;

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
    public Client? Client { get; private set; }
    public int OrganizationId { get; private set; }
    public Organization Organization { get; private set; }

    public ICollection<TimeLog> TimeLogs { get; private set; }

    public static Project Create(
        ProjectName name,
        Color color,
        bool isPublic,
        bool isBillable,
        Organization organization,
        decimal? hourlyRate,
        Client? client
    )
    {
        return new Project
        {
            Name = name,
            Color = color,
            IsPublic = isPublic,
            IsBillable = isBillable,
            HourlyRate = hourlyRate,
            Client = client,
            Organization = organization,
        };
    }

    public void Update(
        string name,
        string color,
        bool isPublic,
        bool isBillable,
        decimal? hourlyRate,
        Client? client
    )
    {
        Name = new ProjectName(name);
        Color = new Color(color);
        IsPublic = isPublic;
        IsBillable = isBillable;
        HourlyRate = hourlyRate;
        Client = client;
    }
}
