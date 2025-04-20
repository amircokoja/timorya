using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Authentication;
using TimeHub.Application.Abstractions.Authorization.Requirements;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.TimeLogs.Shared;
using TimeHub.Application.Users;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Projects;
using TimeHub.Domain.TimeLogs;
using TimeHub.Domain.Users;

namespace TimeHub.Application.TimeLogs.CreateTimeLog;

internal sealed class CreateTimeLogCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService,
    IResourceAuthorizationService resourceAuthorizationService
) : ICommandHandler<CreateTimeLogCommand, TimeLogDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<TimeLogDto>> Handle(
        CreateTimeLogCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var dbUser = await _context
            .Set<User>()
            .Include(c => c.CurrentOrganization)
            .FirstOrDefaultAsync(c => c.Id == user.UserId, cancellationToken);

        if (dbUser == null)
        {
            return Result.Failure<TimeLogDto>(UserErrors.NotFound);
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

            var isAuthorized = await _resourceAuthorizationService.AuthorizeResourceAsync(
                project,
                new ProjectAuthorizationRequirement()
            );

            if (!isAuthorized)
            {
                return Result.Failure<TimeLogDto>(UserErrors.NotAuthorized);
            }
        }

        var timeLog = TimeLog.Create(
            new TimeLogDescription(request.Description),
            request.Start,
            request.End,
            request.Seconds,
            dbUser,
            dbUser.CurrentOrganization,
            project
        );

        await _context.Set<TimeLog>().AddAsync(timeLog, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(TimeLogDto.From(timeLog));
    }
}
