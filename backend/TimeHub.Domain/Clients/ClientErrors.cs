using TimeHub.Domain.Abstractions;

namespace TimeHub.Domain.Clients;

public static class ClientErrors
{
    public static readonly Error NotFound = new("Client.NotFound", "Client not found");
}
