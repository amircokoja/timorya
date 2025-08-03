using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Clients.Shared;

namespace Timorya.Application.Clients.GetClients;

public sealed record GetClientsQuery : IQuery<List<ClientDto>>;
