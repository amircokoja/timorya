using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Users;

public sealed class ForgotPasswordToken : Entity
{
    public ForgotPasswordToken() { }

    public ForgotPasswordToken(User user)
    {
        User = user;
        Token = Guid.NewGuid().ToString();
        ExpiresOnUtc = DateTime.UtcNow.AddDays(1);
    }

    public int UserId { get; private init; }
    public string Token { get; private init; }
    public DateTime ExpiresOnUtc { get; private init; }

    public User User { get; private init; }

    public string GenerateLink(string baseUrl)
    {
        return $"{baseUrl}/reset-password-with-token?token={Token}";
    }
}
