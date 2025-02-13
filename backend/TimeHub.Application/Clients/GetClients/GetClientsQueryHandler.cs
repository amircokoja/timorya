using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Clients.Shared;
using TimeHub.Application.Users;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Clients;

namespace TimeHub.Application.Clients.GetClients;

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
        var user = _currentUserService.GetCurrentUser();
        var clients = await _context
            .Set<Client>()
            .Where(x => x.OrganizationId == user.CurrentOrganizationId)
            .ToListAsync(cancellationToken);

        return Result.Success(clients.Select(ClientDto.From).ToList());
    }
}
