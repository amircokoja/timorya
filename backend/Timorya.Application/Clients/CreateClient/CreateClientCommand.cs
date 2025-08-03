using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Clients.Shared;

namespace Timorya.Application.Clients.CreateClient;

public sealed record CreateClientCommand(
    string FirstName,
    string LastName,
    string Email,
    string Address,
    string Currency,
    string Color
) : ICommand<ClientDto>;
