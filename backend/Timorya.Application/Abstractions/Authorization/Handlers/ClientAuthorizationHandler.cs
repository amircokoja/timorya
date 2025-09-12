using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Users;
using Timorya.Domain.Clients;

namespace Timorya.Application.Abstractions.Authorization.Handlers;

public class ClientAuthorizationHandler(
    ICurrentUserService currentUserService,
    IApplicationDbContext context
) : AuthorizationHandler<ClientAuthorizationRequirement, Client>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;

    private readonly IApplicationDbContext _context = context;

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ClientAuthorizationRequirement requirement,
        Client client
    )
    {
        var user = _currentUserService.GetCurrentUser();
        var userDb = await _context
            .Set<Domain.Users.User>()
            .FirstOrDefaultAsync(u => u.Id == user.UserId);

        if (userDb == null)
        {
            context.Fail();
            return;
        }

        if (client.OrganizationId == userDb.CurrentOrganizationId)
        {
            context.Succeed(requirement);
        }
        else
        {
            context.Fail();
        }

        return;
    }
}
