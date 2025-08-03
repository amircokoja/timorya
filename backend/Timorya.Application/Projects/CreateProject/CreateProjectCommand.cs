using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Projects.Shared;

namespace Timorya.Application.Projects.CreateProject;

public sealed record CreateProjectCommand(
    string Name,
    string Color,
    bool IsPublic,
    bool IsBillable,
    decimal? HourlyRate,
    int? ClientId
) : ICommand<ProjectDto>;
