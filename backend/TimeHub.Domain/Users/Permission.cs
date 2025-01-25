using TimeHub.Domain.Abstractions;

namespace TimeHub.Domain.Users;

public sealed class Permission(int id, string name) : Entity(id)
{
    public static readonly Permission Read = new(1, "Read");
    public static readonly Permission Write = new(2, "Write");
    public static readonly Permission ManageMembers = new(3, "ManageMembers");

    public string Name { get; init; } = name;
}
