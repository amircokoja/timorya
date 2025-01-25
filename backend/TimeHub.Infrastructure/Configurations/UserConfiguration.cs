using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeHub.Domain.Users;

namespace TimeHub.Infrastructure.Configurations;

internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(user => user.Id);

        builder
            .Property(user => user.FirstName)
            .HasMaxLength(200)
            .HasConversion(firstName => firstName.Value, value => new FirstName(value));

        builder
            .Property(user => user.LastName)
            .HasMaxLength(200)
            .HasConversion(firstName => firstName.Value, value => new LastName(value));

        builder
            .Property(user => user.Email)
            .HasMaxLength(200)
            .HasConversion(email => email.Value, value => new Email(value));

        builder
            .Property(user => user.Password)
            .HasMaxLength(200)
            .HasConversion(password => password.Value, value => new Password(value));

        builder.HasIndex(user => user.Email).IsUnique();

        builder
            .HasOne(user => user.CurrentOrganization)
            .WithMany(org => org.Users)
            .HasForeignKey(user => user.CurrentOrganizationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(user => user.UserOrganizations)
            .WithOne(ur => ur.User)
            .HasForeignKey(ur => ur.UserId);
    }
}
