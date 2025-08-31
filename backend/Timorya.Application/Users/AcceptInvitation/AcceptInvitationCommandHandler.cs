using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.AcceptInvitation;

internal sealed class AcceptInvitationCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<AcceptInvitationCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<Unit>> Handle(
        AcceptInvitationCommand request,
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

        var invitation = await _context
            .Set<MemberInvitation>()
            .Include(i => i.Organization)
            .Include(i => i.Role)
            .FirstOrDefaultAsync(i => i.Token == request.Token, cancellationToken);

        if (invitation == null)
        {
            return Result.Failure<Unit>(UserErrors.InvalidToken);
        }

        if (user.Email.Value != invitation.Email)
        {
            return Result.Failure<Unit>(UserErrors.InvalidToken);
        }

        var userOrganization = UserOrganization.Create(
            user,
            invitation.Organization,
            invitation.Role
        );
        _context.Set<UserOrganization>().Add(userOrganization);
        _context.Set<MemberInvitation>().Remove(invitation);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
