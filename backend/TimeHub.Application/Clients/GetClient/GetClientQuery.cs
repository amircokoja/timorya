using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Clients.Shared;

namespace TimeHub.Application.Clients.GetClient;

public sealed record GetClientQuery(int ClientId) : IQuery<ClientDto>;
