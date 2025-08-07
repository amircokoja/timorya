using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.TimeLogs.Shared;

namespace Timorya.Application.TimeLogs.CreateTimeLog;

public sealed record CreateTimeLogCommand(
    string Description,
    int? ProjectId,
    DateTime Start,
    DateTime? End,
    int Seconds
) : ICommand<TimeLogDto>;
