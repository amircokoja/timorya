using TimeHub.Application.Abstractions.Authentication;

namespace TimeHub.Application.Users;

public interface ICurrentUserService
{
    AuthenticatedUser GetCurrentUser();
}
