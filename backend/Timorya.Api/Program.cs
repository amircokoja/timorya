using Scalar.AspNetCore;
using Timorya.Api.Extensions;
using Timorya.Application;
using Timorya.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration, builder.Host);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseRouting();

// if (app.Environment.IsDevelopment())
// {
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapOpenApi();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "Timorya API");
});

app.MapScalarApiReference(options =>
{
    options.Servers = Array.Empty<ScalarServer>();
});

// }

app.UseCustomExceptionHandler();

app.MapControllers();

app.Run();
