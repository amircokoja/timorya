using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Projects.Shared;

namespace TimeHub.Application.Projects.GetProjects;

public sealed record GetProjectsQuery : IQuery<List<ProjectDto>>;
