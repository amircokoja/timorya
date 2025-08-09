using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Common;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.TimeLogs.Shared;
using Timorya.Application.Users;
using Timorya.Domain.Abstractions;
using Timorya.Domain.TimeLogs;

namespace Timorya.Application.TimeLogs.GetTimeLogsForCalendar;

internal sealed class GetTimeLogsForCalendarQueryHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : IQueryHandler<GetTimeLogsForCalendarQuery, IReadOnlyList<TimeLogDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<IReadOnlyList<TimeLogDto>>> Handle(
        GetTimeLogsForCalendarQuery request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var timeLogs = await _context
            .Set<TimeLog>()
            .AsNoTracking()
            .Where(x =>
                x.UserId == user.UserId && x.Start <= request.EndDate && x.End >= request.StartDate
            )
            .Include(x => x.Project)
            .Select(t => TimeLogDto.From(t))
            .ToListAsync(cancellationToken);

        return timeLogs;
    }
}
