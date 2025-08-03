using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timorya.Domain.Users;

namespace Timorya.Infrastructure.Configurations;

internal sealed class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
{
    public void Configure(EntityTypeBuilder<Organization> builder)
    {
        builder.HasKey(org => org.Id);

        builder
            .Property(user => user.Name)
            .HasMaxLength(200)
            .HasConversion(name => name.Value, value => new OrganizationName(value));
    }
}
