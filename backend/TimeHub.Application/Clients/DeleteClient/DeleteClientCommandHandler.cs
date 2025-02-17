using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Authentication;
using TimeHub.Application.Abstractions.Authorization.Requirements;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Clients;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Clients.DeleteClient;

internal sealed class DeleteClientCommandHandler(
    IApplicationDbContext context,
    IResourceAuthorizationService resourceAuthorizationService
) : ICommandHandler<DeleteClientCommand, bool>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IResourceAuthorizationService _resourceAuthorizationService =
        resourceAuthorizationService;

    public async Task<Result<bool>> Handle(
        DeleteClientCommand request,
        CancellationToken cancellationToken
    )
    {
        var client = await _context
            .Set<Client>()
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (client == null)
        {
            return Result.Failure<bool>(ClientErrors.NotFound);
        }

        var isAuthorized = await _resourceAuthorizationService.AuthorizeResourceAsync(
            client,
            new ClientAuthorizationRequirement()
        );

        if (!isAuthorized)
        {
            return Result.Failure<bool>(UserErrors.NotAuthorized);
        }

        _context.Set<Client>().Remove(client);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}
