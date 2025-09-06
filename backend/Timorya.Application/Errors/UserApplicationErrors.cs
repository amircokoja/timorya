using Timorya.Domain.Abstractions;

namespace Timorya.Application.Errors;

public static class UserApplicationErrors
{
    public static readonly Error PasswordMismatch = new(
        "User.PasswordMismatch",
        "The provided passwords do not match."
    );
    public static readonly Error InvalidCredentials = new(
        "User.InvalidCredentials",
        "Invalid credentials."
    );
    public static readonly Error EmailAlreadyExists = new(
        "User.EmailAlreadyExists",
        "A user with the provided email already exists."
    );

    public static readonly Error PasswordsDoNotMatch = new(
        "User.PasswordsDoNotMatch",
        "The provided passwords do not match."
    );

    public static readonly Error RoleNotFound = new(
        "User.RoleNotFound",
        "The specified role was not found."
    );

    public static readonly Error NoActiveOrganization = new(
        "User.NoActiveOrganization",
        "The user does not belong to any active organization."
    );

    public static readonly Error UserAlreadyInOrganization = new(
        "User.UserAlreadyInOrganization",
        "The user is already a member of the organization."
    );

    public static readonly Error InvitationAndUserIdNull = new(
        "User.InvitationAndUserIdNull",
        "Both InvitationId and UserId cannot be null."
    );

    public static readonly Error CannotChangeOwnRole = new(
        "User.CannotChangeOwnRole",
        "Users cannot change their own role."
    );

    public static readonly Error AtLeastOneOwnerRequired = new(
        "User.AtLeastOneOwnerRequired",
        "An organization must have at least one owner."
    );
}
