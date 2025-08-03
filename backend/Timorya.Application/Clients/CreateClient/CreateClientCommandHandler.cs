using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Clients.Shared;
using Timorya.Application.Users;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Clients;
using Timorya.Domain.Shared;
using Timorya.Domain.Users;

namespace Timorya.Application.Clients.CreateClient;

internal sealed class CreateClientCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<CreateClientCommand, ClientDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<Result<ClientDto>> Handle(
        CreateClientCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = _currentUserService.GetCurrentUser();

        var organization = await _context
            .Set<Organization>()
            .FindAsync(user.CurrentOrganizationId, cancellationToken);

        if (organization == null)
        {
            return Result.Failure<ClientDto>(OrganizationErrors.NotFound);
        }

        var client = Client.Create(
            new FirstName(request.FirstName),
            new LastName(request.LastName),
            new Email(request.Email),
            new Address(request.Address),
            new Currency(request.Currency),
            new Color(request.Color),
            organization
        );

        await _context.Set<Client>().AddAsync(client, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(ClientDto.From(client));
    }
}
