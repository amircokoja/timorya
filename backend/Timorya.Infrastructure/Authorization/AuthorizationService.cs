using Microsoft.EntityFrameworkCore;
using Timorya.Domain.Users;

namespace Timorya.Infrastructure.Authorization;

internal sealed class AuthorizationService
{
    private readonly ApplicationDbContext _dbContext;

    public AuthorizationService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<HashSet<string>> GetPermissionsForUserAsync(int userId)
    {
        var permissionNames = await _dbContext
            .Set<UserOrganization>()
            .Where(uo => uo.UserId == userId && uo.OrganizationId == uo.User.CurrentOrganizationId)
            .SelectMany(uo => uo.Role.RolePermissions)
            .Select(rp => rp.Permission.Name)
            .Distinct()
            .ToListAsync();

        var permissionsSet = permissionNames.ToHashSet();

        return permissionsSet;
    }
}
