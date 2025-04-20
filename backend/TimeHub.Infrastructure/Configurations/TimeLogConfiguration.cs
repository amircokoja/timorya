using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeHub.Domain.TimeLogs;

namespace TimeHub.Infrastructure.Configurations;

internal sealed class TimeLogConfiguration : IEntityTypeConfiguration<TimeLog>
{
    public void Configure(EntityTypeBuilder<TimeLog> builder)
    {
        builder.HasKey(timeLog => timeLog.Id);

        builder
            .Property(timeLog => timeLog.Description)
            .HasMaxLength(200)
            .HasConversion(
                description => description.Value,
                value => new TimeLogDescription(value)
            );

        builder
            .HasOne(timeLog => timeLog.Organization)
            .WithMany(org => org.TimeLogs)
            .HasForeignKey(timeLog => timeLog.OrganizationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(timeLog => timeLog.User)
            .WithMany(usr => usr.TimeLogs)
            .HasForeignKey(timeLog => timeLog.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(timeLog => timeLog.Project)
            .WithMany(usr => usr.TimeLogs)
            .HasForeignKey(timeLog => timeLog.ProjectId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
