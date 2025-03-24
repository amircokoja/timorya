using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Projects.Shared;

namespace TimeHub.Application.Projects.GetProject;

public sealed record GetProjectQuery(int ProjectId) : IQuery<ProjectDto>;
