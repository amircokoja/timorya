using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Users;

public class RefreshToken : Entity
{
    public string Token { get; private set; }
    public int UserId { get; private set; }
    public User User { get; private set; }
    public DateTime ExpiresOnUtc { get; private set; }

    public RefreshToken(string token, int userId, DateTime expiresOnUtc)
    {
        Token = token;
        UserId = userId;
        ExpiresOnUtc = expiresOnUtc;
    }

    public void UpdateToken(string token)
    {
        Token = token;
        ExpiresOnUtc = DateTime.UtcNow.AddDays(7);
    }
}
