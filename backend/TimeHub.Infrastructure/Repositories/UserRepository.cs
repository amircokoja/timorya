using Microsoft.EntityFrameworkCore;
using TimeHub.Domain.Users;

namespace TimeHub.Infrastructure.Repositories;

internal sealed class UserRepository(ApplicationDbContext dbContext)
    : Repository<User>(dbContext),
        IUserRepository
{
    public async Task<User?> GetByEmailAsync(string email)
    {
        return await DbContext
            .Users.Include(u => u.UserOrganizations)
            .FirstOrDefaultAsync(u => u.Email == new Email(email));
    }

    public void Add(User entity, Organization organization)
    {
        DbContext.Attach(Role.Owner);
        entity.AddToOrganization(organization, Role.Owner);
        DbContext.Users.Add(entity);
    }
}
