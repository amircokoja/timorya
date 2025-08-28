using Timorya.Domain.Users;

namespace Timorya.Application.Users.CreateOrganization;

public sealed record OrganizationDto(int Id, string Name, bool IsPersonalWorkspace, string Role)
{
    public OrganizationDto(Organization organization, string role)
        : this(organization.Id, organization.Name.Value, organization.IsPersonalWorkspace, role) { }
}
