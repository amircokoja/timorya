using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Clients.Shared;

namespace Timorya.Application.Clients.UpdateClient;

public sealed record UpdateClientCommand(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string Address,
    string Currency,
    string Color
) : ICommand<ClientDto>;
