using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.TimeLogs.Shared;
using Timorya.Application.Users;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Projects;
using Timorya.Domain.TimeLogs;
using Timorya.Domain.Users;

namespace Timorya.Application.TimeLogs.UpdateTimeLog;

internal sealed class UpdateTimeLogCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService,
    IResourceAuthorizationService resourceAuthorizationService
) : ICommandHandler<UpdateTimeLogCommand, TimeLogDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<TimeLogDto>> Handle(
        UpdateTimeLogCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var timeLog = await _context
            .Set<TimeLog>()
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (timeLog == null)
        {
            return Result.Failure<TimeLogDto>(TimeLogErrors.NotFound);
        }

        var isAuthorized = await _resourceAuthorizationService.AuthorizeResourceAsync(
            timeLog,
            new TimeLogAuthorizationRequirement()
        );

        if (!isAuthorized)
        {
            return Result.Failure<TimeLogDto>(UserErrors.NotAuthorized);
        }

        Project? project = null;
        if (request.ProjectId.HasValue)
        {
            project = await _context
                .Set<Project>()
                .FirstOrDefaultAsync(c => c.Id == request.ProjectId, cancellationToken);

            if (project == null)
            {
                return Result.Failure<TimeLogDto>(ProjectErrors.NotFound);
            }

            var isAuthorizedToProject = await _resourceAuthorizationService.AuthorizeResourceAsync(
                project,
                new ProjectAuthorizationRequirement()
            );

            if (!isAuthorizedToProject)
            {
                return Result.Failure<TimeLogDto>(UserErrors.NotAuthorized);
            }
        }

        timeLog.Update(
            new TimeLogDescription(request.Description),
            request.Start,
            request.End,
            request.Seconds,
            project
        );

        _context.Set<TimeLog>().Update(timeLog);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(TimeLogDto.From(timeLog));
    }
}
