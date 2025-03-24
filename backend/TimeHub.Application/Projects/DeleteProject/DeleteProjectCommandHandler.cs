using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Authentication;
using TimeHub.Application.Abstractions.Authorization.Requirements;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Projects;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Projects.DeleteProject;

internal sealed class DeleteProjectCommandHandler(
    IApplicationDbContext context,
    IResourceAuthorizationService resourceAuthorizationService
) : ICommandHandler<DeleteProjectCommand, bool>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<bool>> Handle(
        DeleteProjectCommand request,
        CancellationToken cancellationToken
    )
    {
        var project = await _context
            .Set<Project>()
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (project == null)
        {
            return Result.Failure<bool>(ProjectErrors.NotFound);
        }

        var isAuthorized = await _resourceAuthorizationService.AuthorizeResourceAsync(
            project,
            new ProjectAuthorizationRequirement()
        );

        if (!isAuthorized)
        {
            return Result.Failure<bool>(UserErrors.NotAuthorized);
        }

        _context.Set<Project>().Remove(project);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}
