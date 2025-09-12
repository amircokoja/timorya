using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Authorization.Handlers;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Common.Configuration;
using Timorya.Application.Common.Interfaces;
using Timorya.Application.Users;
using Timorya.Infrastructure.Authentication;
using Timorya.Infrastructure.Authorization;
using Timorya.Infrastructure.Common.Email;
using Timorya.Infrastructure.Common.Models;
using Timorya.Infrastructure.Entities.Users;
using Timorya.Infrastructure.Extensions;

namespace Timorya.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration,
        IHostBuilder hostBuilder
    )
    {
        AddPersistence(services, configuration);

        AddAuthentication(services, configuration);

        AddAuthorization(services);

        AddOpenApi(services);

        AddCORSConfig(services);

        hostBuilder.ConfigureHttps(configuration);

        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IEmailTemplateService, EmailTemplateService>();
        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        services.Configure<ApplicationSettings>(configuration.GetSection("ApplicationSettings"));
        services.Configure<GoogleSettings>(configuration.GetSection("GoogleSettings"));

        services.AddHttpClient();

        return services;
    }

    private static void AddOpenApi(IServiceCollection services)
    {
        services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
            options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_0;
        });
    }

    private static void AddPersistence(IServiceCollection services, IConfiguration configuration)
    {
        string connectionString =
            configuration.GetConnectionString("Database")
            ?? throw new ArgumentNullException(nameof(configuration));

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(
                connectionString,
                p =>
                {
                    p.MigrationsAssembly("Timorya.Infrastructure");
                }
            )
        );

        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetRequiredService<ApplicationDbContext>()
        );
    }

    private static void AddAuthentication(IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var authenticationConfig = configuration.GetSection("Jwt");
                var jwtSettings = authenticationConfig.Get<JwtSettings>();

                if (jwtSettings is not null)
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = jwtSettings.Issuer,

                        ValidateAudience = true,
                        ValidAudience = jwtSettings.Audience,

                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtSettings.Key)
                        ),
                    };
                }
            });

        services.AddScoped<IJwtService, JwtService>();

        services.Configure<JwtSettings>(configuration.GetSection("Jwt"));

        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserService, CurrentUserService>();
    }

    private static void AddAuthorization(IServiceCollection services)
    {
        services.AddScoped<AuthorizationService>();
        services.AddScoped<IResourceAuthorizationService, ResourceAuthorizationService>();
        services.AddScoped<IAuthorizationHandler, ClientAuthorizationHandler>();
        services.AddScoped<IAuthorizationHandler, ProjectAuthorizationHandler>();
        services.AddScoped<IAuthorizationHandler, TimeLogAuthorizationHandler>();

        services.AddTransient<IAuthorizationHandler, PermissionAuthorizationHandler>();

        services.AddTransient<
            IAuthorizationPolicyProvider,
            PermissionAuthorizationPolicyProvider
        >();
    }

    private static void AddCORSConfig(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(
                "AllowAll",
                builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                }
            );
        });
    }
}
