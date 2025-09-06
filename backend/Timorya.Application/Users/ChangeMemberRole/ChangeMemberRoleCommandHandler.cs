using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Errors;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.ChangeMemberRole;

internal sealed class ChangeMemberRoleCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<ChangeMemberRoleCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<Unit>> Handle(
        ChangeMemberRoleCommand request,
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

        var role = await _context
            .Set<Role>()
            .FirstOrDefaultAsync(r => r.Id == request.NewRoleId, cancellationToken);

        if (role == null)
        {
            return Result.Failure<Unit>(RoleErrors.NotFound);
        }

        if (request.UserId != null)
        {
            // if (request.UserId == user.Id)
            // {
            //     return Result.Failure<Unit>(UserApplicationErrors.CannotChangeOwnRole);
            // }

            var targetUser = await _context
                .Set<User>()
                .Include(u => u.UserOrganizations)
                .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

            if (targetUser == null)
            {
                return Result.Failure<Unit>(UserErrors.NotFound);
            }

            var targetUserOrg = targetUser.UserOrganizations.FirstOrDefault(uo =>
                uo.OrganizationId == user.CurrentOrganizationId
            );

            if (targetUserOrg == null)
            {
                return Result.Failure<Unit>(UserErrors.NotAuthorized);
            }

            if (role.Id != Role.Owner.Id)
            {
                var userOrg = await _context
                    .Set<UserOrganization>()
                    .Where(uo =>
                        uo.OrganizationId == user.CurrentOrganizationId
                        && uo.RoleId == Role.Owner.Id
                        && uo.UserId != targetUser.Id
                    )
                    .AnyAsync(cancellationToken);

                if (!userOrg)
                {
                    return Result.Failure<Unit>(UserApplicationErrors.AtLeastOneOwnerRequired);
                }
            }

            targetUserOrg.UpdateRole(role);
            _context.Set<UserOrganization>().Update(targetUserOrg);
        }
        else if (request.InvitationId != null)
        {
            var invitation = await _context
                .Set<MemberInvitation>()
                .Include(i => i.Organization)
                .FirstOrDefaultAsync(i => i.Id == request.InvitationId, cancellationToken);

            if (invitation == null)
            {
                return Result.Failure<Unit>(UserErrors.InvalidInvitation);
            }

            invitation.UpdateRole(role);

            _context.Set<MemberInvitation>().Update(invitation);
        }
        else
        {
            return Result.Failure<Unit>(UserApplicationErrors.InvitationAndUserIdNull);
        }
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
