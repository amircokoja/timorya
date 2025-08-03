using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Users;

public record Password(string Value)
{
    public static Result<Password> Create(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
        {
            return Result.Failure<Password>(UserErrors.PasswordCannotBeEmpty);
        }

        if (password.Length < 6)
        {
            return Result.Failure<Password>(UserErrors.PasswordMustBeAtLeast6CharactersLong);
        }

        return Result.Success(new Password(HashPassword(password)));
    }

    private static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(12));
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}
