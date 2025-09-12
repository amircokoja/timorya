using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Timorya.Infrastructure.Authentication;

namespace Timorya.Infrastructure.Authorization;

internal sealed class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
{
    private readonly IServiceProvider _serviceProvider;

    public PermissionAuthorizationHandler(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PermissionRequirement requirement
    )
    {
        using IServiceScope scope = _serviceProvider.CreateScope();

        AuthorizationService authorizationService =
            scope.ServiceProvider.GetRequiredService<AuthorizationService>();

        var userId = context.User?.GetUserId();

        if (userId is null)
        {
            return;
        }

        HashSet<string> permissions = await authorizationService.GetPermissionsForUserAsync(
            (int)userId
        );

        if (permissions.Contains(requirement.Permission))
        {
            context.Succeed(requirement);
        }
    }
}
