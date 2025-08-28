using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Users.CreateOrganization;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetOrganizations;

internal sealed class GetOrganizationsQueryHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : IQueryHandler<GetOrganizationsQuery, IReadOnlyList<OrganizationDto>>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<IReadOnlyList<OrganizationDto>>> Handle(
        GetOrganizationsQuery request,
        CancellationToken cancellationToken
    )
    {
        var userData = _currentUserService.GetCurrentUser();

        var user = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Id == userData.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<IReadOnlyList<OrganizationDto>>(UserErrors.NotFound);
        }

        var organizations = await _context
            .Set<Organization>()
            .Include(o => o.UserOrganizations)
            .ThenInclude(uo => uo.Role)
            .Where(o => o.UserOrganizations.Any(u => u.UserId == user.Id))
            .ToListAsync(cancellationToken);

        return organizations
            .Select(o => new OrganizationDto(
                o,
                o.UserOrganizations.FirstOrDefault(u => u.UserId == user.Id)!.Role.Name
            ))
            .ToList();
    }
}
