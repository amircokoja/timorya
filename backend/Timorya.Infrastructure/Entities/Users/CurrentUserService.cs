using Microsoft.AspNetCore.Http;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Users;
using Timorya.Infrastructure.Authentication;

namespace Timorya.Infrastructure.Entities.Users;

public class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public AuthenticatedUser GetCurrentUser()
    {
        var email = _httpContextAccessor?.HttpContext?.User?.GetEmail();

        var userId = _httpContextAccessor?.HttpContext?.User?.GetUserId();

        var role = _httpContextAccessor?.HttpContext?.User?.GetRole();

        if (email == null || userId == null)
        {
            throw new UnauthorizedAccessException();
        }

        return new AuthenticatedUser
        {
            Email = email,
            UserId = userId.Value,
            Role = role ?? string.Empty,
        };
    }
}
