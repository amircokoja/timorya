using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Projects.Shared;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Clients;
using Timorya.Domain.Projects;
using Timorya.Domain.Users;

namespace Timorya.Application.Projects.UpdateProject;

internal sealed class UpdateProjectCommandHandler(
    IApplicationDbContext context,
    IResourceAuthorizationService resourceAuthorizationService
) : ICommandHandler<UpdateProjectCommand, ProjectDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<ProjectDto>> Handle(
        UpdateProjectCommand request,
        CancellationToken cancellationToken
    )
    {
        var project = await _context
            .Set<Project>()
            .Include(p => p.Client)
            .FirstOrDefaultAsync(p => p.Id == request.ProjectId, cancellationToken);

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

        Client? client = null;

        if (request.ClientId.HasValue)
        {
            client = await _context
                .Set<Client>()
                .FirstOrDefaultAsync(c => c.Id == request.ClientId, cancellationToken);

            isAuthorized = await _resourceAuthorizationService.AuthorizeResourceAsync(
                client,
                new ClientAuthorizationRequirement()
            );

            if (!isAuthorized)
            {
                return Result.Failure<ProjectDto>(UserErrors.NotAuthorized);
            }
        }

        project.Update(
            request.Name,
            request.Color,
            request.IsPublic,
            request.IsBillable,
            request.HourlyRate,
            client
        );

        _context.Set<Project>().Update(project);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(ProjectDto.From(project));
    }
}
