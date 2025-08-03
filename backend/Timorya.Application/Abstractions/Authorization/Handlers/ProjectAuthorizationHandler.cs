using Microsoft.AspNetCore.Authorization;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Users;
using Timorya.Domain.Projects;

namespace Timorya.Application.Abstractions.Authorization.Handlers;

public class ProjectAuthorizationHandler(ICurrentUserService currentUserService)
    : AuthorizationHandler<ProjectAuthorizationRequirement, Project>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ProjectAuthorizationRequirement requirement,
        Project project
    )
    {
        var user = _currentUserService.GetCurrentUser();

        if (project.OrganizationId == user?.CurrentOrganizationId)
        {
            context.Succeed(requirement);
        }
        else
        {
            context.Fail();
        }

        return Task.CompletedTask;
    }
}
