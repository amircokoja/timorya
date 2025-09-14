using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.DeactivateAccount;

internal sealed class DeactivateAccountCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<DeactivateAccountCommand, Unit>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<Unit>> Handle(
        DeactivateAccountCommand request,
        CancellationToken cancellationToken
    )
    {
        var userData = _currentUserService.GetCurrentUser();

        var user = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Id == userData.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<Unit>(UserErrors.NotFound);
        }

        var blockingOrgIds = await _context
            .Set<UserOrganization>()
            .AsNoTracking()
            .Where(uo => uo.UserId == user.Id && uo.RoleId == Role.Owner.Id)
            .Select(uo => new
            {
                uo.OrganizationId,
                OtherOwnerExists = _context
                    .Set<UserOrganization>()
                    .Any(o =>
                        o.OrganizationId == uo.OrganizationId
                        && o.RoleId == Role.Owner.Id
                        && o.UserId != user.Id
                    ),
            })
            .Where(x => !x.OtherOwnerExists)
            .Select(x => x.OrganizationId)
            .Distinct()
            .ToListAsync();

        if (blockingOrgIds.Any())
        {
            return Result.Failure<Unit>(UserErrors.CannotDeleteAccountAsOnlyOwner);
        }

        _context.Set<User>().Remove(user);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(Unit.Value);
    }
}
