using TimeHub.Domain.TimeLogs;

namespace TimeHub.Application.TimeLogs.Shared;

public class TimeLogDto
{
    public int Id { get; set; }
    public string Description { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public int Seconds { get; set; }
    public int? ProjectId { get; set; }
    public string? ProjectName { get; set; }

    public static TimeLogDto From(TimeLog timeLog)
    {
        return new TimeLogDto
        {
            Id = timeLog.Id,
            Description = timeLog.Description.Value,
            Start = timeLog.Start,
            End = timeLog.End,
            Seconds = timeLog.Seconds,
            ProjectId = timeLog.ProjectId,
            ProjectName = timeLog.Project?.Name.Value,
        };
    }
}
