using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.GetInvitation;

internal sealed class GetInvitationQueryHandler(IApplicationDbContext context)
    : IQueryHandler<GetInvitationQuery, InvitationMemberDto>
{
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<InvitationMemberDto>> Handle(
        GetInvitationQuery request,
        CancellationToken cancellationToken
    )
    {
        var invitation = await _context
            .Set<MemberInvitation>()
            .Include(i => i.Organization)
            .FirstOrDefaultAsync(i => i.Token == request.Token, cancellationToken);

        if (invitation == null)
        {
            return Result.Failure<InvitationMemberDto>(UserErrors.InvalidToken);
        }

        return InvitationMemberDto.FromEntity(invitation);
    }
}
