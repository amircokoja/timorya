using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Shared;
using TimeHub.Domain.TimeLogs;

namespace TimeHub.Domain.Users;

public sealed class User : Entity
{
    private readonly List<UserOrganization> _userOrganizations = [];

    private User() { }

    public FirstName FirstName { get; private set; }

    public LastName LastName { get; private set; }

    public Email Email { get; private set; }

    public Password Password { get; private set; }

    public int CurrentOrganizationId { get; private set; }

    public Organization CurrentOrganization { get; private set; }

    public ICollection<TimeLog> TimeLogs { get; private set; }

    public IReadOnlyCollection<UserOrganization> UserOrganizations =>
        _userOrganizations.AsReadOnly();

    public static User Create(
        FirstName firstName,
        LastName lastName,
        Email email,
        Password password,
        Organization organization
    )
    {
        return new User
        {
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Password = password,
            CurrentOrganization = organization,
        };
    }

    public Result AddToOrganization(Organization organization, Role role)
    {
        if (_userOrganizations.Any(uo => uo.OrganizationId == organization?.Id))
        {
            return Result.Failure(UserErrors.AlreadyPartOfOrganization);
        }

        _userOrganizations.Add(new UserOrganization(this, organization, role));

        return Result.Success();
    }

    public bool VerifyPassword(string password)
    {
        return Password.VerifyPassword(password, Password.Value);
    }

    public void SetPassword(Password newPassword)
    {
        Password = newPassword;
    }
}
