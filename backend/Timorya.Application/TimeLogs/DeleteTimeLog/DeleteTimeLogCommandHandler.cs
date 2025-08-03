using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Users;
using Timorya.Domain.Abstractions;
using Timorya.Domain.TimeLogs;
using Timorya.Domain.Users;

namespace Timorya.Application.TimeLogs.DeleteTimeLog;

internal sealed class DeleteTimeLogCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService,
    IResourceAuthorizationService resourceAuthorizationService
) : ICommandHandler<DeleteTimeLogCommand, bool>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<bool>> Handle(
        DeleteTimeLogCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var dbUser = await _context
            .Set<User>()
            .FirstOrDefaultAsync(c => c.Id == user.UserId, cancellationToken);

        if (dbUser == null)
        {
            return Result.Failure<bool>(UserErrors.NotFound);
        }

        var timeLog = await _context
            .Set<TimeLog>()
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (timeLog == null)
        {
            return Result.Failure<bool>(TimeLogErrors.NotFound);
        }

        var isAuthorized = await _resourceAuthorizationService.AuthorizeResourceAsync(
            timeLog,
            new TimeLogAuthorizationRequirement()
        );

        if (!isAuthorized)
        {
            return Result.Failure<bool>(UserErrors.NotAuthorized);
        }

        _context.Set<TimeLog>().Remove(timeLog);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success(true);
    }
}
