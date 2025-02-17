using Microsoft.AspNetCore.Authorization;

namespace TimeHub.Application.Abstractions.Authentication;

public interface IResourceAuthorizationService
{
    Task<bool> AuthorizeResourceAsync<TResource>(
        TResource resource,
        IAuthorizationRequirement requirement
    );
}
