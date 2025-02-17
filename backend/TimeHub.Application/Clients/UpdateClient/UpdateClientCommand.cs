using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Clients.Shared;

namespace TimeHub.Application.Clients.UpdateClient;

public sealed record UpdateClientCommand(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string Address,
    string Currency,
    string Color
) : ICommand<ClientDto>;
