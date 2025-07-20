using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.TimeLogs.DeleteTimeLog;

public sealed record DeleteTimeLogCommand(int Id) : ICommand<bool>;
