using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.TimeLogs.Shared;

namespace Timorya.Application.TimeLogs.GetActiveTimeLog;

public sealed record GetActiveTimeLogQuery() : IQuery<TimeLogDto?>;
