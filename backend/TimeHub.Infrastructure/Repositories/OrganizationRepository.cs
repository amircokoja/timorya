using TimeHub.Domain.Users;

namespace TimeHub.Infrastructure.Repositories;

internal sealed class OrganizationRepository(ApplicationDbContext dbContext)
    : Repository<Organization>(dbContext),
        IOrganizationRepository { }
