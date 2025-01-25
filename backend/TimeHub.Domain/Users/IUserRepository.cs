namespace TimeHub.Domain.Users;

public interface IUserRepository
{
    // GET
    Task<User?> GetByEmailAsync(string email);

    // POST
    void Add(User user, Organization organization);
}
