using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Projects.Shared;

namespace Timorya.Application.Projects.GetProject;

public sealed record GetProjectQuery(int ProjectId) : IQuery<ProjectDto>;
