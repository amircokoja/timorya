using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Projects.Shared;

namespace Timorya.Application.Projects.GetProjects;

public sealed record GetProjectsQuery : IQuery<List<ProjectDto>>;
