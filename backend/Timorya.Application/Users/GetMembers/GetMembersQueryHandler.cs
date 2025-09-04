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
        var userData = _currentUserService.GetCurrentUser();

        if (!userData.CurrentOrganizationId.HasValue)
        {
            return Result.Failure<IReadOnlyList<MemberResponse>>(UserErrors.NoActiveOrganization);
        }

        var organization = await _context
            .Set<Organization>()
            .Include(o => o.UserOrganizations)
            .ThenInclude(uo => uo.User)
            .Include(o => o.UserOrganizations)
            .ThenInclude(uo => uo.Role)
            .Include(o => o.MemberInvitations)
            .ThenInclude(mi => mi.Role)
            .FirstOrDefaultAsync(o => o.Id == userData.CurrentOrganizationId.Value);

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
