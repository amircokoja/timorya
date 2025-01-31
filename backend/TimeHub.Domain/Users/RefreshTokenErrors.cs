using TimeHub.Domain.Abstractions;

namespace TimeHub.Domain.Users;

public static class RefreshTokenErrors
{
    public static readonly Error InvalidRefreshToken =
        new("RefreshToken.InvalidRefreshToken", "Invalid refresh token");
}
