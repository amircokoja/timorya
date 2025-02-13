using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Clients.Shared;

namespace TimeHub.Application.Clients.GetClients;

public sealed record GetClientsQuery : IQuery<List<ClientDto>>;
