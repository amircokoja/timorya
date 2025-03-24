using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Authentication;
using TimeHub.Application.Abstractions.Authorization.Requirements;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Projects.Shared;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Projects;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Projects.GetProject;

internal sealed class GetProjectQueryHandler(
    IApplicationDbContext context,
    IResourceAuthorizationService resourceAuthorizationService
) : IQueryHandler<GetProjectQuery, ProjectDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<ProjectDto>> Handle(
        GetProjectQuery request,
        CancellationToken cancellationToken
    )
    {
        var project = await _context
            .Set<Project>()
            .Include(c => c.Client)
            .FirstOrDefaultAsync(c => c.Id == request.ProjectId, cancellationToken);

        if (project == null)
        {
            return Result.Failure<ProjectDto>(ProjectErrors.NotFound);
        }

        var isAuthorized = await _resourceAuthorizationService.AuthorizeResourceAsync(
            project,
            new ProjectAuthorizationRequirement()
        );

        if (!isAuthorized)
        {
            return Result.Failure<ProjectDto>(UserErrors.NotAuthorized);
        }

        return Result.Success(ProjectDto.From(project));
    }
}
