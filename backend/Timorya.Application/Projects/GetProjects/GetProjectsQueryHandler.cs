using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Projects.Shared;
using Timorya.Application.Users;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Projects;
using Timorya.Domain.Users;

namespace Timorya.Application.Projects.GetProjects;

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
        var currentUser = _currentUserService.GetCurrentUser();

        var user = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Id == currentUser.UserId, cancellationToken);
        if (user == null)
        {
            return Result.Failure<List<ProjectDto>>(UserErrors.NotFound);
        }

        var projects = await _context
            .Set<Project>()
            .Include(x => x.Client)
            .Where(x => x.OrganizationId == user.CurrentOrganizationId)
            .ToListAsync(cancellationToken);

        return Result.Success(projects.Select(ProjectDto.From).ToList());
    }
}
