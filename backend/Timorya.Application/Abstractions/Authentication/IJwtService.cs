using Timorya.Domain.Users;

namespace Timorya.Application.Abstractions.Authentication;

public interface IJwtService
{
    string GenerateJwtToken(int userId, string email, int? organizationId, Role? role);
    string GenerateRefreshToken();
}
