using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timorya.Domain.Projects;
using Timorya.Domain.Shared;

namespace Timorya.Infrastructure.Configurations;

internal sealed class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.HasKey(client => client.Id);

        builder
            .Property(client => client.Name)
            .HasMaxLength(200)
            .HasConversion(firstName => firstName.Value, value => new ProjectName(value));

        builder
            .Property(client => client.Color)
            .HasMaxLength(200)
            .HasConversion(color => color.Value, value => new Color(value));

        builder
            .HasOne(project => project.Client)
            .WithMany(client => client.Projects)
            .HasForeignKey(project => project.ClientId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
