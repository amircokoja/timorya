using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Clients.DeleteClient;

public sealed record DeleteClientCommand(int Id) : ICommand<bool>;
