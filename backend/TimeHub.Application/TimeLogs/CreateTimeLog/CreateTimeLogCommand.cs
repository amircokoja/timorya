using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.TimeLogs.Shared;

namespace TimeHub.Application.TimeLogs.CreateTimeLog;

public sealed record CreateTimeLogCommand(
    string Description,
    DateTime Start,
    DateTime End,
    int Seconds,
    int? ProjectId
) : ICommand<TimeLogDto>;
