using Timorya.Application.Abstractions.Authentication;

namespace Timorya.Application.Users;

public interface ICurrentUserService
{
    AuthenticatedUser GetCurrentUser();
}
