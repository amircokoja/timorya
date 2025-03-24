using Microsoft.AspNetCore.Authorization;
using TimeHub.Application.Abstractions.Authorization.Requirements;
using TimeHub.Application.Users;
using TimeHub.Domain.Projects;

namespace TimeHub.Application.Abstractions.Authorization.Handlers;

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
