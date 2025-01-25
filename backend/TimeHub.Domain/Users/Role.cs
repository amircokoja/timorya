using TimeHub.Domain.Abstractions;

namespace TimeHub.Domain.Users;

public sealed class Role(int id, string name) : Entity(id)
{
    public static readonly Role Member = new(1, "Member");
    public static readonly Role Administrator = new(2, "Administrator");
    public static readonly Role Owner = new(3, "Owner");

    public string Name { get; init; } = name;

    public ICollection<Permission> Permissions { get; private set; } = [];
    public ICollection<User> Users { get; private set; } = [];

    public static Role FromName(string name)
    {
        return name switch
        {
            "Member" => Member,
            "Administrator" => Administrator,
            "Owner" => Owner,
            _ => throw new ArgumentException($"Role with name {name} does not exist.")
        };
    }
}
