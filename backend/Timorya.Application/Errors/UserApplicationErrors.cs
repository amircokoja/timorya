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
}
