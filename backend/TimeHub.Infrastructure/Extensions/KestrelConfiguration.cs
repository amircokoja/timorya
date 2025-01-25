using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace TimeHub.Infrastructure.Extensions;

public static class KestrelConfiguration
{
    public static IHostBuilder ConfigureHttps(
        this IHostBuilder hostBuilder,
        IConfiguration configuration
    )
    {
        var environment = configuration["ASPNETCORE_ENVIRONMENT"];

        if (environment == "Development")
        {
            var serverCertificatePath = configuration[
                "ASPNETCORE_Kestrel__Certificates__Default__Path"
            ];
            var serverCertificatePassword = configuration[
                "ASPNETCORE_Kestrel__Certificates__Default__Password"
            ];

            if (
                !string.IsNullOrEmpty(serverCertificatePath)
                && !string.IsNullOrEmpty(serverCertificatePassword)
            )
            {
                if (File.Exists(serverCertificatePath))
                {
                    hostBuilder.ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder.ConfigureKestrel(options =>
                        {
                            options.ListenAnyIP(80);
                            options.ListenAnyIP(
                                443,
                                listenOptions =>
                                {
                                    listenOptions.UseHttps(
                                        serverCertificatePath,
                                        serverCertificatePassword
                                    );
                                }
                            );
                        });
                    });
                }
                else
                {
                    Console.WriteLine("Certificate file not found, running without HTTPS.");
                }
            }
            else
            {
                Console.WriteLine("HTTPS configuration not provided, running without HTTPS.");
            }
        }

        return hostBuilder;
    }
}
