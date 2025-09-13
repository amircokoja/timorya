using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetUserData;

internal sealed class GetUserDataQueryHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : IQueryHandler<GetUserDataQuery, UserDataResponse>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<UserDataResponse>> Handle(
        GetUserDataQuery request,
        CancellationToken cancellationToken
    )
    {
        var userData = _currentUserService.GetCurrentUser();

        var currentOrgId = await _context
            .Set<User>()
            .Where(u => u.Id == userData.UserId)
            .Select(u => u.CurrentOrganizationId)
            .FirstOrDefaultAsync(cancellationToken);

        var user = await _context
            .Set<User>()
            .AsNoTracking()
            .Where(u => u.Id == userData.UserId)
            .Include(u => u.UserOrganizations.Where(uo => uo.OrganizationId == currentOrgId))
            .ThenInclude(uo => uo.Organization)
            .Include(u => u.UserOrganizations.Where(uo => uo.OrganizationId == currentOrgId))
            .ThenInclude(uo => uo.Role)
            .ThenInclude(r => r.RolePermissions)
            .ThenInclude(rp => rp.Permission)
            .FirstOrDefaultAsync(cancellationToken);

        if (user == null)
        {
            return Result.Failure<UserDataResponse>(UserErrors.NotFound);
        }

        return UserDataResponse.FromUser(user);
    }
}
