using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Common;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.TimeLogs.Shared;
using Timorya.Application.Users;
using Timorya.Domain.Abstractions;
using Timorya.Domain.TimeLogs;

namespace Timorya.Application.TimeLogs.GetActiveTimeLog;

internal sealed class GetActiveTimeLogQueryHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : IQueryHandler<GetActiveTimeLogQuery, TimeLogDto?>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<TimeLogDto?>> Handle(
        GetActiveTimeLogQuery request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var timeLog = await _context
            .Set<TimeLog>()
            .Include(c => c.Project)
            .FirstOrDefaultAsync(c => c.UserId == user.UserId && c.End == null, cancellationToken);

        if (timeLog == null)
        {
            return Result.Success<TimeLogDto?>(null);
        }

        return Result.Success<TimeLogDto?>(TimeLogDto.From(timeLog));
    }
}
