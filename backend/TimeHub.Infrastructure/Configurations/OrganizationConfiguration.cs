using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeHub.Domain.Users;

namespace TimeHub.Infrastructure.Configurations;

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
