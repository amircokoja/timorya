using Timorya.Domain.Abstractions;

namespace Timorya.Domain.TimeLogs;

public static class TimeLogErrors
{
    public static readonly Error NotFound = new("TimeLog.NotFound", "Time log not found");
}
