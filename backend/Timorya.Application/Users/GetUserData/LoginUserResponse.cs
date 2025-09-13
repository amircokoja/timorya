using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetUserData;

public sealed class UserDataResponse(
    string email,
    string firstName,
    string lastName,
    bool isPasswordSet,
    int? currentOrganizationId,
    OrganizationDataResponse? currentOrganization = null
)
{
    public string Email { get; init; } = email;
    public string FirstName { get; init; } = firstName;
    public string LastName { get; init; } = lastName;
    public bool IsPasswordSet { get; init; } = isPasswordSet;
    public int? CurrentOrganizationId { get; init; } = currentOrganizationId;
    public OrganizationDataResponse? CurrentOrganization { get; set; } = currentOrganization;

    public static UserDataResponse FromUser(User user)
    {
        var usersOrg = user.UserOrganizations.FirstOrDefault(uo =>
            uo.OrganizationId == user.CurrentOrganizationId
        );

        return new UserDataResponse(
            user.Email.Value,
            user.FirstName.Value,
            user.LastName.Value,
            string.IsNullOrWhiteSpace(user.Password.Value) == false,
            user.CurrentOrganizationId,
            usersOrg is null
                ? null
                : new OrganizationDataResponse(
                    usersOrg.OrganizationId,
                    usersOrg.Organization.Name.Value,
                    user.UserOrganizations.First(uo =>
                        uo.OrganizationId == usersOrg.OrganizationId
                    ).Role.Name,
                    user.UserOrganizations.First(uo => uo.OrganizationId == usersOrg.OrganizationId)
                        .Role.RolePermissions.Select(rp => rp.Permission.Name)
                        .ToList()
                )
        );
    }
}

public sealed class OrganizationDataResponse(
    int id,
    string name,
    string role,
    IReadOnlyList<string> permissions
)
{
    public int Id { get; init; } = id;
    public string Name { get; init; } = name;
    public string Role { get; set; } = role;
    public IReadOnlyList<string> Permissions { get; set; } = permissions;
}
