using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetRoles;

internal sealed class GetRolesQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetRolesQuery, IReadOnlyList<RoleResponse>>
{
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<IReadOnlyList<RoleResponse>>> Handle(
        GetRolesQuery request,
        CancellationToken cancellationToken
    )
    {
        var roles = await _context
            .Set<Role>()
            .Select(r => new RoleResponse(r.Id, r.Name))
            .ToListAsync(cancellationToken);

        return roles.Select(r => new RoleResponse(r.Id, r.Name)).ToList();
    }
}
