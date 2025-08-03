using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Clients.Shared;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Clients;
using Timorya.Domain.Users;

namespace Timorya.Application.Clients.GetClient;

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
