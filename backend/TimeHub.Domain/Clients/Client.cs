using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Projects;
using TimeHub.Domain.Shared;
using TimeHub.Domain.Users;

namespace TimeHub.Domain.Clients;

public sealed class Client : Entity
{
    private Client() { }

    public FirstName FirstName { get; private set; }
    public LastName LastName { get; private set; }
    public Email Email { get; private set; }
    public Address Address { get; private set; }
    public Currency Currency { get; private set; }
    public Color Color { get; private set; }

    // foreign key
    public int OrganizationId { get; private set; }
    public Organization Organization { get; private set; }

    // navigation property
    public ICollection<Project> Projects { get; private set; }

    public static Client Create(
        FirstName firstName,
        LastName lastName,
        Email email,
        Address address,
        Currency currency,
        Color color,
        Organization organization
    )
    {
        return new Client
        {
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Address = address,
            Currency = currency,
            Color = color,
            Organization = organization,
        };
    }

    public void Update(
        string firstName,
        string lastName,
        string email,
        string address,
        string currency,
        string color
    )
    {
        FirstName = new FirstName(firstName);
        LastName = new LastName(lastName);
        Email = new Email(email);
        Address = new Address(address);
        Currency = new Currency(currency);
        Color = new Color(color);
    }

    public string GetFullName() => $"{FirstName} {LastName}";
}
