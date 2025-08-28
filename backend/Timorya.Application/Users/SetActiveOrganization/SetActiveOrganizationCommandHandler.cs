using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.SetActiveOrganization;

internal sealed class SetActiveOrganizationCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<SetActiveOrganizationCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<Unit>> Handle(
        SetActiveOrganizationCommand request,
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

        var organization = await _context
            .Set<Organization>()
            .Include(o => o.UserOrganizations)
            .ThenInclude(uo => uo.Role)
            .FirstOrDefaultAsync(
                o =>
                    o.Id == request.OrganizationId
                    && o.UserOrganizations.Any(uo => uo.UserId == user.Id),
                cancellationToken
            );

        if (organization == null)
        {
            return Result.Failure<Unit>(UserErrors.NotAuthorized);
        }

        user.SetCurrentOrganization(organization);
        _context.Set<User>().Update(user);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(Unit.Value);
    }
}
