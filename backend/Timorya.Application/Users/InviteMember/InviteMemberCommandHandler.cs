using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Common.Interfaces;
using Timorya.Application.Errors;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Shared;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.InviteMember;

internal sealed class InviteMemberCommandHandler(
    IApplicationDbContext context,
    IEmailService emailService,
    IEmailTemplateService emailTemplateService,
    ICurrentUserService currentUserService
) : ICommandHandler<InviteMemberCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IEmailService _emailService = emailService;
    private readonly IEmailTemplateService _emailTemplateService = emailTemplateService;

    public async Task<Result<Unit>> Handle(
        InviteMemberCommand request,
        CancellationToken cancellationToken
    )
    {
        var adminUser = _currentUserService.GetCurrentUser();

        if (adminUser.CurrentOrganizationId is null)
        {
            return Result.Failure<Unit>(UserApplicationErrors.NoActiveOrganization);
        }

        var adminUserDb = await _context
            .Set<User>()
            .Include(u => u.CurrentOrganization)
            .FirstOrDefaultAsync(u => u.Id == adminUser.UserId, cancellationToken);

        if (adminUserDb == null)
        {
            return Result.Failure<Unit>(UserErrors.NotFound);
        }

        if (adminUserDb.CurrentOrganization is null)
        {
            return Result.Failure<Unit>(OrganizationErrors.NotFound);
        }

        var user = await _context
            .Set<User>()
            .Include(u => u.UserOrganizations)
            .FirstOrDefaultAsync(u => u.Email == new Email(request.Email), cancellationToken);

        if (
            user is not null
            && user.UserOrganizations.Any(uo =>
                uo.OrganizationId == adminUserDb.CurrentOrganizationId
            )
        )
        {
            return Result.Failure<Unit>(UserApplicationErrors.UserAlreadyInOrganization);
        }

        var role = await _context
            .Set<Role>()
            .FirstOrDefaultAsync(r => r.Id == request.RoleId, cancellationToken);

        if (role is null)
        {
            return Result.Failure<Unit>(UserApplicationErrors.RoleNotFound);
        }

        var memberInvitation = new MemberInvitation(request.Email, role, adminUserDb);

        _context.Set<MemberInvitation>().Add(memberInvitation);
        await _context.SaveChangesAsync(cancellationToken);

        // SEND AN EMIAL

        return Unit.Value;
    }
}
