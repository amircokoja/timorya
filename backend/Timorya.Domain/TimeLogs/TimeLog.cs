using Timorya.Domain.Abstractions;
using Timorya.Domain.Projects;
using Timorya.Domain.Users;

namespace Timorya.Domain.TimeLogs;

public class TimeLog : Entity
{
    private TimeLog() { }

    public TimeLogDescription Description { get; set; }
    public DateTime Start { get; set; }
    public DateTime? End { get; set; }
    public int Seconds { get; set; }

    // foreign key
    public int? ProjectId { get; private set; }
    public int UserId { get; private init; }
    public int OrganizationId { get; private init; }
    public Project? Project { get; private set; }
    public User User { get; private init; }
    public Organization Organization { get; private init; }

    public static TimeLog Create(
        TimeLogDescription description,
        User user,
        Organization organization,
        Project? project = null
    )
    {
        return new TimeLog
        {
            Description = description,
            Start = DateTime.UtcNow,
            End = null,
            Seconds = 0,
            User = user,
            Organization = organization,
            Project = project,
        };
    }

    public void Update(
        TimeLogDescription description,
        DateTime start,
        DateTime end,
        int seconds,
        Project? project = null
    )
    {
        Description = description;
        Start = start;
        End = end;
        Seconds = seconds;
        Project = project;
    }
}
