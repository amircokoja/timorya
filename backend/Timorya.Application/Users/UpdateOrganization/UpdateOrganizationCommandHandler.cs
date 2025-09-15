using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Users.CreateOrganization;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.UpdateOrganization;

internal sealed class UpdateOrganizationCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<UpdateOrganizationCommand, OrganizationDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<OrganizationDto>> Handle(
        UpdateOrganizationCommand request,
        CancellationToken cancellationToken
    )
    {
        var userData = _currentUserService.GetCurrentUser();

        var user = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Id == userData.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<OrganizationDto>(UserErrors.NotFound);
        }

        var organization = await _context
            .Set<Organization>()
            .FirstOrDefaultAsync(o => o.Id == request.Id, cancellationToken);

        if (organization == null)
        {
            return Result.Failure<OrganizationDto>(OrganizationErrors.NotFound);
        }

        organization.UpdateName(request.Name);

        _context.Set<Organization>().Update(organization);
        await _context.SaveChangesAsync(cancellationToken);

        return new OrganizationDto(organization, Role.Owner.Name, []);
    }
}
