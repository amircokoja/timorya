using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Users;

public static class UserErrors
{
    public static readonly Error NotFound = new("User.NotFound", "User not found");

    public static readonly Error PasswordCannotBeEmpty = new(
        "User.PasswordCannotBeEmpty",
        "Password cannot be empty"
    );
    public static readonly Error PasswordMustBeAtLeast6CharactersLong = new(
        "User.PasswordMustBeAtLeast6CharactersLong",
        "Password must be at least 6 characters long"
    );
    public static readonly Error AlreadyPartOfOrganization = new(
        "User.AlreadyPartOfOrganization",
        "User is already part of this organization"
    );

    public static readonly Error NotAuthorized = new(
        "User.NotAuthorized",
        "User is not authorized to perform this action"
    );

    public static readonly Error InvalidToken = new(
        "User.InvalidToken",
        "The provided token is invalid"
    );

    public static readonly Error NoActiveOrganization = new(
        "User.NoActiveOrganization",
        "User does not have an active organization"
    );

    public static readonly Error InvalidInvitation = new(
        "User.InvalidInvitation",
        "The provided invitation is invalid"
    );

    public static readonly Error NotMemberOfOrganization = new(
        "User.NotMemberOfOrganization",
        "User is not a member of the organization"
    );

    public static readonly Error CannotDeleteAccountAsOnlyOwner = new(
        "User.CannotDeleteAccountAsOnlyOwner",
        "Cannot delete account as the only owner of an organization"
    );
}
