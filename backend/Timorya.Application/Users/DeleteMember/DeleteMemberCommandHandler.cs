using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Errors;
using Timorya.Domain.Abstractions;
using Timorya.Domain.TimeLogs;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.DeleteMember;

internal sealed class DeleteMemberCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<DeleteMemberCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<Unit>> Handle(
        DeleteMemberCommand request,
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

        if (request.UserId != null)
        {
            if (request.UserId == user.Id)
            {
                return Result.Failure<Unit>(UserApplicationErrors.CannotDeleteYourself);
            }

            // fetch user organization for deletion
            var userOrganization = await _context
                .Set<UserOrganization>()
                .Where(uo =>
                    uo.OrganizationId == user.CurrentOrganizationId && uo.UserId == request.UserId
                )
                .FirstOrDefaultAsync(cancellationToken);

            if (userOrganization == null)
            {
                return Result.Failure<Unit>(UserErrors.NotMemberOfOrganization);
            }

            if (userOrganization.RoleId == Role.Owner.Id)
            {
                var otherOwners = await _context
                    .Set<UserOrganization>()
                    .Where(uo =>
                        uo.OrganizationId == user.CurrentOrganizationId
                        && uo.RoleId == Role.Owner.Id
                        && uo.UserId != request.UserId
                    )
                    .AnyAsync(cancellationToken);

                if (!otherOwners)
                {
                    return Result.Failure<Unit>(UserApplicationErrors.AtLeastOneOwnerRequired);
                }
            }

            // remove logs for the user
            var timeLogs = await _context
                .Set<TimeLog>()
                .Where(tl =>
                    tl.UserId == request.UserId && tl.OrganizationId == user.CurrentOrganizationId
                )
                .ToListAsync(cancellationToken);

            // nullify current organization for the user if it's their current one
            var userToUpdate = await _context
                .Set<User>()
                .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);
            if (
                userToUpdate != null
                && userToUpdate.CurrentOrganizationId == user.CurrentOrganizationId
            )
            {
                userToUpdate.SetCurrentOrganization(null);
                _context.Set<User>().Update(userToUpdate);
            }

            _context.Set<TimeLog>().RemoveRange(timeLogs);
            _context.Set<UserOrganization>().Remove(userOrganization);
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

            _context.Set<MemberInvitation>().Remove(invitation);
        }
        else
        {
            return Result.Failure<Unit>(UserApplicationErrors.InvitationAndUserIdNull);
        }
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
