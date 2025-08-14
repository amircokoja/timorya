using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetUserData;

public sealed class UserDataResponse(
    string email,
    string firstName,
    string lastName,
    bool isPasswordSet
)
{
    public string Email { get; init; } = email;
    public string FirstName { get; init; } = firstName;
    public string LastName { get; init; } = lastName;
    public bool IsPasswordSet { get; init; } = isPasswordSet;

    public static UserDataResponse FromUser(User user)
    {
        return new UserDataResponse(
            user.Email.Value,
            user.FirstName.Value,
            user.LastName.Value,
            string.IsNullOrWhiteSpace(user.Password.Value) == false
        );
    }
}
