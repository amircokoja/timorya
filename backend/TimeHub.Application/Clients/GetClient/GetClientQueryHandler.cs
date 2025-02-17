using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Authentication;
using TimeHub.Application.Abstractions.Authorization.Requirements;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Clients.Shared;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Clients;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Clients.GetClient;

internal sealed class GetClientQueryHandler(
    IApplicationDbContext context,
    IResourceAuthorizationService resourceAuthorizationService
) : IQueryHandler<GetClientQuery, ClientDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<ClientDto>> Handle(
        GetClientQuery request,
        CancellationToken cancellationToken
    )
    {
        var client = await _context
            .Set<Client>()
            .FirstOrDefaultAsync(c => c.Id == request.ClientId, cancellationToken);

        if (client == null)
        {
            return Result.Failure<ClientDto>(ClientErrors.NotFound);
        }

        var isAuthorized = await _resourceAuthorizationService.AuthorizeResourceAsync(
            client,
            new ClientAuthorizationRequirement()
        );

        if (!isAuthorized)
        {
            return Result.Failure<ClientDto>(UserErrors.NotAuthorized);
        }

        return Result.Success(ClientDto.From(client));
    }
}
