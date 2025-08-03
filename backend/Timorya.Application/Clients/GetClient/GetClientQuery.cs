using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Clients.Shared;

namespace Timorya.Application.Clients.GetClient;

public sealed record GetClientQuery(int ClientId) : IQuery<ClientDto>;
