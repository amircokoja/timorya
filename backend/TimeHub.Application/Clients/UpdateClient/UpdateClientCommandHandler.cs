using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Authentication;
using TimeHub.Application.Abstractions.Authorization.Requirements;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Clients.Shared;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Clients;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Clients.UpdateClient;

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
