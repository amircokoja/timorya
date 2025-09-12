using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Clients.Shared;
using Timorya.Application.Users;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Clients;
using Timorya.Domain.Users;

namespace Timorya.Application.Clients.GetClients;

internal sealed class GetClientsQueryHandler(
    ICurrentUserService currentUserService,
    IApplicationDbContext context
) : IQueryHandler<GetClientsQuery, List<ClientDto>>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<List<ClientDto>>> Handle(
        GetClientsQuery request,
        CancellationToken cancellationToken
    )
    {
        var currentUser = _currentUserService.GetCurrentUser();

        var user = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Id == currentUser.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<List<ClientDto>>(UserErrors.NotFound);
        }

        var clients = await _context
            .Set<Client>()
            .Where(x => x.OrganizationId == user.CurrentOrganizationId)
            .ToListAsync(cancellationToken);

        return Result.Success(clients.Select(ClientDto.From).ToList());
    }
}
