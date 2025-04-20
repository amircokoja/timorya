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
) : IQueryHandler<GetTimeLogsQuery, IReadOnlyList<TimeLogGroup>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<IReadOnlyList<TimeLogGroup>>> Handle(
        GetTimeLogsQuery request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var timeLogs = await _context
            .Set<TimeLog>()
            .Include(c => c.Project)
            .Where(c => c.UserId == user.UserId)
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

        var grouped = splitLogs
            .GroupBy(x => x.Date)
            .Select(g => new TimeLogGroup
            {
                Date = g.Key,
                TimeLogs = g.Select(x => x.Log).ToList(),
            })
            .OrderByDescending(g => g.Date)
            .ToList();

        return Result.Success<IReadOnlyList<TimeLogGroup>>(grouped);
    }
}
