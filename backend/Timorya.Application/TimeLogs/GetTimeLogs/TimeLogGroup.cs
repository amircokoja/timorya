using Timorya.Application.TimeLogs.Shared;

namespace Timorya.Application.TimeLogs.GetTimeLogs;

public class TimeLogGroup
{
    public IList<TimeLogDto> TimeLogs { get; set; }
    public DateOnly Date { get; set; }
}
