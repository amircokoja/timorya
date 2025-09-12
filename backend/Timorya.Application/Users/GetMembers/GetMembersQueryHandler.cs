using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetMembers;

internal sealed class GetMembersQueryHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : IQueryHandler<GetMembersQuery, IReadOnlyList<MemberResponse>>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<IReadOnlyList<MemberResponse>>> Handle(
        GetMembersQuery request,
        CancellationToken cancellationToken
    )
    {
        var currentUser = _currentUserService.GetCurrentUser();

        var user = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Id == currentUser.UserId, cancellationToken);
        if (user == null)
        {
            return Result.Failure<IReadOnlyList<MemberResponse>>(UserErrors.NotFound);
        }

        if (!user.CurrentOrganizationId.HasValue)
        {
            return Result.Failure<IReadOnlyList<MemberResponse>>(UserErrors.NoActiveOrganization);
        }

        var organization = await _context
            .Set<Organization>()
            .Where(o => o.Id == user.CurrentOrganizationId.Value)
            .Include(o => o.UserOrganizations)
            .ThenInclude(uo => uo.User)
            .Include(o => o.UserOrganizations)
            .ThenInclude(uo => uo.Role)
            .Include(o => o.MemberInvitations)
            .ThenInclude(mi => mi.Role)
            .FirstOrDefaultAsync(o => o.Id == user.CurrentOrganizationId.Value);

        if (organization == null)
        {
            return Result.Failure<IReadOnlyList<MemberResponse>>(UserErrors.NoActiveOrganization);
        }

        var members = organization.UserOrganizations.Select(MemberResponse.FromUser).ToList();
        var invitations = organization
            .MemberInvitations.Select(MemberResponse.FromInvitation)
            .ToList();
        members.AddRange(invitations);

        return members;
    }
}
