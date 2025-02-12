using TimeHub.Domain.Abstractions;

namespace TimeHub.Domain.Users;

public static class OrganizationErrors
{
    public static readonly Error NotFound = new("Organization.NotFound", "Organization not found");
}
