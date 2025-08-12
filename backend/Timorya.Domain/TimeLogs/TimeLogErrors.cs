using Timorya.Domain.Abstractions;

namespace Timorya.Domain.TimeLogs;

public static class TimeLogErrors
{
    public static readonly Error NotFound = new("TimeLog.NotFound", "Time log not found");

    public static readonly Error AlreadyExists = new(
        "TimeLog.AlreadyExists",
        "Time log already exists"
    );
}
