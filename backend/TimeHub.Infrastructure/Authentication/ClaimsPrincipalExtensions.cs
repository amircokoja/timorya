using System.Security.Claims;

namespace TimeHub.Infrastructure.Authentication;

public static class ClaimsPrincipalExtensions
{
    public static string? GetEmail(this ClaimsPrincipal principal)
    {
        return principal.FindFirstValue(ClaimTypes.Email);
    }

    public static int? GetUserId(this ClaimsPrincipal principal)
    {
        return int.TryParse(principal.FindFirstValue(ClaimTypes.NameIdentifier), out var userId)
            ? userId
            : null;
    }

    public static int? GetOrganizationId(this ClaimsPrincipal principal)
    {
        return int.TryParse(
            principal.FindFirstValue(JwtCustomClaimNames.Organization),
            out var organizationId
        )
            ? organizationId
            : null;
    }

    public static string? GetRole(this ClaimsPrincipal principal)
    {
        return principal.FindFirstValue(ClaimTypes.Role);
    }
}
