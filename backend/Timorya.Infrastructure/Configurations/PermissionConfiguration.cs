using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timorya.Domain.Users;

namespace Timorya.Infrastructure.Configurations;

internal sealed class PermissionConfiguration : IEntityTypeConfiguration<Permission>
{
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.HasData([Permission.Read, Permission.Write, Permission.ManageMembers]);
    }
}
