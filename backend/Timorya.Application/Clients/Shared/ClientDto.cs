using Timorya.Domain.Clients;

namespace Timorya.Application.Clients.Shared;

public class ClientDto
{
    public int Id { get; set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }
    public string Address { get; private set; }
    public string Currency { get; private set; }
    public string Color { get; private set; }
    public int OrganizationId { get; private set; }

    public static ClientDto From(Client client)
    {
        return new ClientDto
        {
            Id = client.Id,
            FirstName = client.FirstName.Value,
            LastName = client.LastName.Value,
            Email = client.Email.Value,
            Address = client.Address.Value,
            Currency = client.Currency.Code,
            Color = client.Color.Value,
            OrganizationId = client.OrganizationId,
        };
    }
}
