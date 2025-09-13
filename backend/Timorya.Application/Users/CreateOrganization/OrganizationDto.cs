using Timorya.Domain.Users;

namespace Timorya.Application.Users.CreateOrganization;

public sealed record OrganizationDto(
    int Id,
    string Name,
    bool IsPersonalWorkspace,
    string Role,
    IReadOnlyList<string> Permissions
)
{
    public OrganizationDto(
        Organization organization,
        string role,
        IReadOnlyList<string> permissions
    )
        : this(
            organization.Id,
            organization.Name.Value,
            organization.IsPersonalWorkspace,
            role,
            permissions
        ) { }
}
