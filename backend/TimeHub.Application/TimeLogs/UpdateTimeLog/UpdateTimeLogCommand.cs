using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.TimeLogs.Shared;

namespace TimeHub.Application.TimeLogs.UpdateTimeLog;

public sealed record UpdateTimeLogCommand(
    int Id,
    string Description,
    DateTime Start,
    DateTime End,
    int Seconds,
    int? ProjectId
) : ICommand<TimeLogDto>;
