using TimeHub.Domain.Users;

namespace TimeHub.Application.Abstractions.Authentication;

public interface IJwtService
{
    string GenerateJwtToken(int userId, string email, int organizationId, Role? role);
}
