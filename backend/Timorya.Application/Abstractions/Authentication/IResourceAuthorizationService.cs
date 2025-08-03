using Microsoft.AspNetCore.Authorization;

namespace Timorya.Application.Abstractions.Authentication;

public interface IResourceAuthorizationService
{
    Task<bool> AuthorizeResourceAsync<TResource>(
        TResource resource,
        IAuthorizationRequirement requirement
    );
}
