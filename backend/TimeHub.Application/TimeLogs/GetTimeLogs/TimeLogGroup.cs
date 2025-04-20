using TimeHub.Application.TimeLogs.Shared;

namespace TimeHub.Application.TimeLogs.GetTimeLogs;

public class TimeLogGroup
{
    public IList<TimeLogDto> TimeLogs { get; set; }
    public DateOnly Date { get; set; }
}
