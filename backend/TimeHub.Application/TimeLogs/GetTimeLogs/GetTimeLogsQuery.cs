using TimeHub.Application.Abstractions.Common;
using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.TimeLogs.GetTimeLogs;

public sealed record GetTimeLogsQuery(int Page = 1, int PageSize = 20)
    : IQuery<PaginatedResult<TimeLogWeekGroup>>;
