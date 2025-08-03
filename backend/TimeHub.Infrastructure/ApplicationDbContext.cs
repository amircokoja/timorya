using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Exceptions;
using TimeHub.Domain.Clients;
using TimeHub.Domain.Projects;
using TimeHub.Domain.TimeLogs;
using TimeHub.Domain.Users;

namespace TimeHub.Infrastructure;

public sealed class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<UserOrganization> UserOrganizations { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    public DbSet<RolePermission> RolePermissions { get; set; }
    public DbSet<Organization> Organizations { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<ForgotPasswordToken> ForgotPasswordTokens { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<TimeLog> TimeLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            int result = await base.SaveChangesAsync(cancellationToken);
            return result;
        }
        catch (DbUpdateConcurrencyException ex)
        {
            throw new ConcurrencyException("Concurrency exception occurred.", ex);
        }
    }
}
