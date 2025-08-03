using Timorya.Domain.Abstractions;

namespace Timorya.Domain.Projects;

public static class ProjectErrors
{
    public static readonly Error NotFound = new("Project.NotFound", "Project not found");
}
