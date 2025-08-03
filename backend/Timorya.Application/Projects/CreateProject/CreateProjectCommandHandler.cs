using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Projects.Shared;
using Timorya.Application.Users;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Clients;
using Timorya.Domain.Projects;
using Timorya.Domain.Shared;
using Timorya.Domain.Users;

namespace Timorya.Application.Projects.CreateProject;

internal sealed class CreateProjectCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<CreateProjectCommand, ProjectDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<ProjectDto>> Handle(
        CreateProjectCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var organization = await _context
            .Set<Organization>()
            .FindAsync(user.CurrentOrganizationId, cancellationToken);

        if (organization == null)
        {
            return Result.Failure<ProjectDto>(OrganizationErrors.NotFound);
        }

        Client? client = null;
        if (request.ClientId.HasValue)
        {
            client = await _context
                .Set<Client>()
                .Where(c => c.Id == request.ClientId.Value && c.OrganizationId == organization.Id)
                .SingleOrDefaultAsync(cancellationToken);

            if (client == null)
            {
                return Result.Failure<ProjectDto>(ClientErrors.NotFound);
            }
        }

        var project = Project.Create(
            new ProjectName(request.Name),
            new Color(request.Color),
            request.IsPublic,
            request.IsBillable,
            organization,
            request.HourlyRate,
            client
        );

        await _context.Set<Project>().AddAsync(project, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(ProjectDto.From(project, client));
    }
}
