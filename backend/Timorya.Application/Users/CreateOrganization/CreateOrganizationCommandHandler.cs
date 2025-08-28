using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.CreateOrganization;

internal sealed class CreateOrganizationCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<CreateOrganizationCommand, OrganizationDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<OrganizationDto>> Handle(
        CreateOrganizationCommand request,
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

        var organization = Organization.Create(request.Name, request.IsPersonalWorkspace);

        _context.Set<Organization>().Add(organization);

        var userOrganization = UserOrganization.Create(user, organization, Role.Owner);
        user.SetCurrentOrganization(organization);

        _context.Set<UserOrganization>().Add(userOrganization);
        _context.Set<Role>().Attach(Role.Owner);
        _context.Set<User>().Update(user);
        await _context.SaveChangesAsync(cancellationToken);

        return new OrganizationDto(organization, Role.Owner.Name);
    }
}
