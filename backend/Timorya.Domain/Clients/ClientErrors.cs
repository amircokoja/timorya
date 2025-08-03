using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Clients;

public static class ClientErrors
{
    public static readonly Error NotFound = new("Client.NotFound", "Client not found");
}
