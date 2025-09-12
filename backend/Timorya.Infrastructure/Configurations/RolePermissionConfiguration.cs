using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timorya.Domain.Users;

namespace Timorya.Infrastructure.Configurations;

internal sealed class RolePermissionConfiguration : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        builder.HasKey(rp => new { rp.RoleId, rp.PermissionId });

        builder
            .HasOne(rp => rp.Role)
            .WithMany(r => r.RolePermissions)
            .HasForeignKey(rp => rp.RoleId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(rp => rp.Permission)
            .WithMany()
            .HasForeignKey(rp => rp.PermissionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasData(
            [
                RolePermission.Create(Role.Administrator, Permission.Read),
                RolePermission.Create(Role.Administrator, Permission.Write),
                RolePermission.Create(Role.Administrator, Permission.ManageMembers),
                RolePermission.Create(Role.Member, Permission.Read),
                RolePermission.Create(Role.Member, Permission.Write),
                RolePermission.Create(Role.Owner, Permission.Read),
                RolePermission.Create(Role.Owner, Permission.Write),
                RolePermission.Create(Role.Owner, Permission.ManageMembers),
                RolePermission.Create(Role.Owner, Permission.ManageOrganizations),
            ]
        );
    }
}
