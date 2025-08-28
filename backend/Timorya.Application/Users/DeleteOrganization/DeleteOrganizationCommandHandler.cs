using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.TimeLogs;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.DeleteOrganization;

internal sealed class DeleteOrganizationCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<DeleteOrganizationCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<Unit>> Handle(
        DeleteOrganizationCommand request,
        CancellationToken cancellationToken
    )
    {
        var userData = _currentUserService.GetCurrentUser();

        var organization = await _context
            .Set<Organization>()
            .Include(o => o.UserOrganizations)
            .ThenInclude(uo => uo.Role)
            .FirstOrDefaultAsync(o => o.Id == request.OrganizationId, cancellationToken);

        if (organization == null)
        {
            return Result.Failure<Unit>(UserErrors.NotFound);
        }

        // nullify current organization for users with active org
        var usersWithActiveOrg = await _context
            .Set<User>()
            .Where(u => u.CurrentOrganizationId == request.OrganizationId)
            .ToListAsync(cancellationToken);

        foreach (var user in usersWithActiveOrg)
        {
            user.RemoveFromOrganization(organization);
        }

        // remove current logs
        var logs = await _context
            .Set<TimeLog>()
            .Where(tl => tl.OrganizationId == request.OrganizationId)
            .ToListAsync(cancellationToken);
        _context.Set<TimeLog>().RemoveRange(logs);
        _context.Set<Organization>().Remove(organization);

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(Unit.Value);
    }
}
