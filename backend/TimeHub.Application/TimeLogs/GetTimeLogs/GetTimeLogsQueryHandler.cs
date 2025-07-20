using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.TimeLogs.Shared;
using TimeHub.Application.Users;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.TimeLogs;

namespace TimeHub.Application.TimeLogs.GetTimeLogs;

internal sealed class GetTimeLogsQueryHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : IQueryHandler<GetTimeLogsQuery, IReadOnlyList<TimeLogWeekGroup>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<IReadOnlyList<TimeLogWeekGroup>>> Handle(
        GetTimeLogsQuery request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var timeLogs = await _context
            .Set<TimeLog>()
            .Include(c => c.Project)
            .Where(c => c.UserId == user.UserId)
            .OrderByDescending(c => c.End)
            .ToListAsync(cancellationToken);

        var splitLogs = new List<(DateOnly Date, TimeLogDto Log)>();

        foreach (var log in timeLogs)
        {
            var current = log.Start;
            var end = log.End;

            while (current < end)
            {
                var date = DateOnly.FromDateTime(current.Date);
                var startOfNextDay = current.Date.AddDays(1);

                var rangeEnd = end < startOfNextDay ? end : startOfNextDay;

                var seconds = (int)(rangeEnd - current).TotalSeconds;

                var dto = new TimeLogDto
                {
                    Id = log.Id,
                    Description = log.Description.Value,
                    Start = current,
                    End = rangeEnd,
                    Seconds = seconds,
                    ProjectId = log.ProjectId,
                    ProjectName = log.Project?.Name.Value,
                };

                splitLogs.Add((date, dto));

                current = rangeEnd;
            }
        }

        var groupedByDate = splitLogs
            .GroupBy(x => x.Date)
            .Select(g => new TimeLogGroup
            {
                Date = g.Key,
                TimeLogs = g.Select(x => x.Log).ToList(),
            })
            .ToList();

        var groupedByWeek = groupedByDate
            .GroupBy(g => GetWeekLabel(g.Date))
            .Select(g => new TimeLogWeekGroup
            {
                Week = g.Key,
                Dates = g.OrderByDescending(x => x.Date).ToList(),
            })
            .OrderByDescending(g => g.Dates.Max(d => d.Date)) // sort by most recent date in the week
            .ToList();

        return Result.Success<IReadOnlyList<TimeLogWeekGroup>>(groupedByWeek);
    }

    private static string GetWeekLabel(DateOnly date)
    {
        var today = DateOnly.FromDateTime(DateTime.Today);

        var startOfThisWeek = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
        var startOfLastWeek = startOfThisWeek.AddDays(-7);
        var endOfLastWeek = startOfThisWeek.AddDays(-1);

        var startOfCurrent = date.AddDays(-(int)date.DayOfWeek + (int)DayOfWeek.Monday);
        var endOfCurrent = startOfCurrent.AddDays(6);

        if (date >= startOfThisWeek && date <= startOfThisWeek.AddDays(6))
            return "This week";

        if (date >= startOfLastWeek && date <= endOfLastWeek)
            return "Last week";

        return $"{startOfCurrent:MMMM d} - {endOfCurrent:MMMM d}";
    }
}

public class TimeLogWeekGroup
{
    public string Week { get; set; } = default!;
    public List<TimeLogGroup> Dates { get; set; } = [];
}
