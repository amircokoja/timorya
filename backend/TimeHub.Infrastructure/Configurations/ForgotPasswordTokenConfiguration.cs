using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeHub.Domain.Users;

namespace TimeHub.Infrastructure.Configurations;

internal sealed class ForgotPasswordTokenConfiguration
    : IEntityTypeConfiguration<ForgotPasswordToken>
{
    public void Configure(EntityTypeBuilder<ForgotPasswordToken> builder)
    {
        builder.HasKey(token => token.Id);

        builder.Property(token => token.Token).HasMaxLength(200).IsRequired();

        builder.HasIndex(token => token.Token).IsUnique();

        builder
            .HasOne(token => token.User)
            .WithMany()
            .HasForeignKey(token => token.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
