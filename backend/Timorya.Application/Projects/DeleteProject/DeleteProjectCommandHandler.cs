using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Projects;
using Timorya.Domain.Users;

namespace Timorya.Application.Projects.DeleteProject;

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
