using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Projects.Shared;
using TimeHub.Application.Users;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Projects;

namespace TimeHub.Application.Projects.GetProjects;

internal sealed class GetProjectsQueryHandler(
    ICurrentUserService currentUserService,
    IApplicationDbContext context
) : IQueryHandler<GetProjectsQuery, List<ProjectDto>>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<List<ProjectDto>>> Handle(
        GetProjectsQuery request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();
        var projects = await _context
            .Set<Project>()
            .Include(x => x.Client)
            .Where(x => x.OrganizationId == user.CurrentOrganizationId)
            .ToListAsync(cancellationToken);

        return Result.Success(projects.Select(ProjectDto.From).ToList());
    }
}
