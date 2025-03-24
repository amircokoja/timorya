using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Projects.Shared;

namespace TimeHub.Application.Projects.UpdateProject;

public sealed record UpdateProjectCommand(
    int ProjectId,
    string Name,
    string Color,
    bool IsPublic,
    bool IsBillable,
    decimal? HourlyRate,
    int? ClientId
) : ICommand<ProjectDto>;
