using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Projects.DeleteProject;

public sealed record DeleteProjectCommand(int Id) : ICommand<bool>;
