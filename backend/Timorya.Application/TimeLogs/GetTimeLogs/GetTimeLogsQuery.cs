using Timorya.Application.Abstractions.Common;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.TimeLogs.GetTimeLogs;

public sealed record GetTimeLogsQuery(int Page = 1, int PageSize = 20)
    : IQuery<PaginatedResult<TimeLogWeekGroup>>;
