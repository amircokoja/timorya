using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Projects.Shared;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Projects;
using Timorya.Domain.Users;

namespace Timorya.Application.Projects.GetProject;

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
