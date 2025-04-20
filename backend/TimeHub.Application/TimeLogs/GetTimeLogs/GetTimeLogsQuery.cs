using TimeHub.Application.Abstractions.Messaging;

namespace TimeHub.Application.TimeLogs.GetTimeLogs;

public sealed record GetTimeLogsQuery() : IQuery<IReadOnlyList<TimeLogGroup>>;
