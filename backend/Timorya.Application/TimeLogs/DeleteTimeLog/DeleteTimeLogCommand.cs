using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.TimeLogs.DeleteTimeLog;

public sealed record DeleteTimeLogCommand(int Id) : ICommand<bool>;
