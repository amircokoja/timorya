using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.Projects.DeleteProject;

public sealed record DeleteProjectCommand(int Id) : ICommand<bool>;
