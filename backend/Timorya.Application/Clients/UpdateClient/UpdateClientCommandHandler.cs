using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Clients.Shared;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Clients;
using Timorya.Domain.Users;

namespace Timorya.Application.Clients.UpdateClient;

internal sealed class UpdateClientCommandHandler(
    IApplicationDbContext context,
    IResourceAuthorizationService resourceAuthorizationService
) : ICommandHandler<UpdateClientCommand, ClientDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<ClientDto>> Handle(
        UpdateClientCommand request,
        CancellationToken cancellationToken
    )
    {
        var client = await _context
            .Set<Client>()
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

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

        client.Update(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Address,
            request.Currency,
            request.Color
        );

        _context.Set<Client>().Update(client);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(ClientDto.From(client));
    }
}
