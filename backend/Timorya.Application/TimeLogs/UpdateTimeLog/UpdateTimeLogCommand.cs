using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.TimeLogs.Shared;

namespace Timorya.Application.TimeLogs.UpdateTimeLog;

public sealed record UpdateTimeLogCommand(
    int Id,
    string Description,
    DateTime Start,
    DateTime? End,
    int Seconds,
    int? ProjectId
) : ICommand<TimeLogDto>;
