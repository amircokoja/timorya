using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Users;

public static class OrganizationErrors
{
    public static readonly Error NotFound = new("Organization.NotFound", "Organization not found");
}
