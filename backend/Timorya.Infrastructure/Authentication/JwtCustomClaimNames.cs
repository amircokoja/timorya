namespace Timorya.Infrastructure.Authentication;

public static class JwtCustomClaimNames
{
    public static string Organization => "organizationId";
    public static string Email =>
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    public static string UserId =>
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
}
