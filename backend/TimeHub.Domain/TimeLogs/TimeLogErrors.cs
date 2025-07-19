using TimeHub.Domain.Abstractions;

namespace TimeHub.Domain.TimeLogs;

public static class TimeLogErrors
{
    public static readonly Error NotFound = new("TimeLog.NotFound", "Time log not found");
}
