using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.TimeLogs.Shared;

namespace Timorya.Application.TimeLogs.GetTimeLogsForCalendar;

public sealed record GetTimeLogsForCalendarQuery(DateTime StartDate, DateTime EndDate)
    : IQuery<IReadOnlyList<TimeLogDto>>;
