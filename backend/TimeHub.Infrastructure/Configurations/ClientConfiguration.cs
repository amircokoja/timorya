using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeHub.Domain.Clients;
using TimeHub.Domain.Shared;

namespace TimeHub.Infrastructure.Configurations;

internal sealed class ClientConfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder.HasKey(client => client.Id);

        builder
            .Property(client => client.FirstName)
            .HasMaxLength(200)
            .HasConversion(firstName => firstName.Value, value => new FirstName(value));

        builder
            .Property(client => client.LastName)
            .HasMaxLength(200)
            .HasConversion(firstName => firstName.Value, value => new LastName(value));

        builder
            .Property(client => client.Email)
            .HasMaxLength(200)
            .HasConversion(email => email.Value, value => new Email(value));

        builder
            .Property(client => client.Address)
            .HasMaxLength(200)
            .HasConversion(address => address.Value, value => new Address(value));

        builder
            .Property(client => client.Currency)
            .HasMaxLength(200)
            .HasConversion(currency => currency.Code, code => new Currency(code));

        builder
            .Property(client => client.Color)
            .HasMaxLength(200)
            .HasConversion(color => color.Value, value => new Color(value));

        builder
            .HasOne(client => client.Organization)
            .WithMany(org => org.Clients)
            .HasForeignKey(client => client.OrganizationId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
