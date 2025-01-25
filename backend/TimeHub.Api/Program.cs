using TimeHub.Api.Extensions;
using TimeHub.Application;
using TimeHub.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration, builder.Host);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "TimeHub API");
    });
}

app.MapControllers();

app.UseHttpsRedirection();

app.UseCustomExceptionHandler();

app.Run();
