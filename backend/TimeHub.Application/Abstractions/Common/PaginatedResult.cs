namespace TimeHub.Application.Abstractions.Common;

public class PaginatedResult<T>
{
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public IReadOnlyList<T> Items { get; set; } = [];

    public static PaginatedResult<T> Create(
        int currentPage,
        int totalCount,
        int pageSize,
        IReadOnlyList<T> items
    )
    {
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        return new PaginatedResult<T>
        {
            CurrentPage = currentPage,
            TotalPages = totalPages,
            TotalCount = totalCount,
            Items = items,
        };
    }
}
