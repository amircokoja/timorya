using Timorya.Domain.Users;

namespace Timorya.Application.Users.RegisterUser;

public sealed record RegisterUserResponse(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    int OrganizationId
)
{
    public RegisterUserResponse(User user)
        : this(
            user.Id,
            user.FirstName.Value,
            user.LastName.Value,
            user.Email.Value,
            user.CurrentOrganizationId
        ) { }
}
