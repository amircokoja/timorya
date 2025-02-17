using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using TimeHub.Application.Abstractions.Authentication;

namespace TimeHub.Infrastructure.Authentication;

public class ResourceAuthorizationService(
    IAuthorizationService authorizationService,
    IHttpContextAccessor httpContextAccessor
) : IResourceAuthorizationService
{
    private readonly IAuthorizationService _authorizationService = authorizationService;
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public async Task<bool> AuthorizeResourceAsync<TResource>(
        TResource resource,
        IAuthorizationRequirement requirement
    )
    {
        var user = _httpContextAccessor.HttpContext?.User;
        if (user == null)
        {
            return false;
        }

        var authResult = await _authorizationService.AuthorizeAsync(user, resource, requirement);
        return authResult.Succeeded;
    }
}
