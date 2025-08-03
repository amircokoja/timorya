using Microsoft.AspNetCore.Authorization;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Users;
using Timorya.Domain.Clients;

namespace Timorya.Application.Abstractions.Authorization.Handlers;

public class ClientAuthorizationHandler(ICurrentUserService currentUserService)
    : AuthorizationHandler<ClientAuthorizationRequirement, Client>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ClientAuthorizationRequirement requirement,
        Client client
    )
    {
        var user = _currentUserService.GetCurrentUser();

        if (client.OrganizationId == user?.CurrentOrganizationId)
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
