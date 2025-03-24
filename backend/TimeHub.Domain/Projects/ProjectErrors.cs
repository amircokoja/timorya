using TimeHub.Domain.Abstractions;

namespace TimeHub.Domain.Projects;

public static class ProjectErrors
{
    public static readonly Error NotFound = new("Project.NotFound", "Project not found");
}
