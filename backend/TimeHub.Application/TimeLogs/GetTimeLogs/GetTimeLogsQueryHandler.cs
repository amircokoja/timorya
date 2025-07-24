using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Common;
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
) : IQueryHandler<GetTimeLogsQuery, PaginatedResult<TimeLogWeekGroup>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<PaginatedResult<TimeLogWeekGroup>>> Handle(
        GetTimeLogsQuery request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var totalCount = await _context
            .Set<TimeLog>()
            .Where(c => c.UserId == user.UserId)
            .CountAsync(cancellationToken);

        var skip = (request.Page - 1) * request.PageSize;
        var timeLogs = await _context
            .Set<TimeLog>()
            .Include(c => c.Project)
            .Where(c => c.UserId == user.UserId)
            .OrderByDescending(c => c.End)
            .Skip(skip)
            .Take(request.PageSize)
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

                var dto = TimeLogDto.From(log);

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

        return Result.Success(
            PaginatedResult<TimeLogWeekGroup>.Create(
                request.Page,
                totalCount,
                request.PageSize,
                groupedByWeek
            )
        );
    }

    private static string GetWeekLabel(DateOnly date)
    {
        var today = DateOnly.FromDateTime(DateTime.Today);

        // Ensure Monday is always the start of the week, even if today is Sunday (DayOfWeek = 0)
        int todayOffset = ((int)today.DayOfWeek + 6) % 7;
        var startOfThisWeek = today.AddDays(-todayOffset);
        var startOfLastWeek = startOfThisWeek.AddDays(-7);
        var endOfLastWeek = startOfThisWeek.AddDays(-1);

        int dateOffset = ((int)date.DayOfWeek + 6) % 7;
        var startOfCurrent = date.AddDays(-dateOffset);
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
