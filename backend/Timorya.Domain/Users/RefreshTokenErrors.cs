using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Users;

public static class RefreshTokenErrors
{
    public static readonly Error InvalidRefreshToken = new(
        "RefreshToken.InvalidRefreshToken",
        "Invalid refresh token"
    );
}
