using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Clients.Shared;

namespace TimeHub.Application.Clients.CreateClient;

public sealed record CreateClientCommand(
    string FirstName,
    string LastName,
    string Email,
    string Address,
    string Currency,
    string Color
) : ICommand<ClientDto>;
