using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Projects.Shared;

namespace TimeHub.Application.Projects.CreateProject;

public sealed record CreateProjectCommand(
    string Name,
    string Color,
    bool IsPublic,
    bool IsBillable,
    decimal? HourlyRate,
    int? ClientId
) : ICommand<ProjectDto>;
