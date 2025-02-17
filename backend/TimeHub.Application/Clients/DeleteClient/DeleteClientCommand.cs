using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.Clients.DeleteClient;

public sealed record DeleteClientCommand(int Id) : ICommand<bool>;
