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

// if (app.Environment.IsDevelopment())
// {
app.MapOpenApi();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "Timorya API");
});

app.UseCors("AllowAll");

app.MapScalarApiReference(options =>
{
    options.Servers = Array.Empty<ScalarServer>();
});

// }

app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.UseCustomExceptionHandler();

app.Run();
