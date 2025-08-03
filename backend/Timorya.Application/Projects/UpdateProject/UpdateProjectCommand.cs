using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Projects.Shared;

namespace Timorya.Application.Projects.UpdateProject;

public sealed record UpdateProjectCommand(
    int ProjectId,
    string Name,
    string Color,
    bool IsPublic,
    bool IsBillable,
    decimal? HourlyRate,
    int? ClientId
) : ICommand<ProjectDto>;
