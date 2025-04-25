using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeHub.Api.Controllers.TimeLogs.Models;
using TimeHub.Application.TimeLogs.CreateTimeLog;
using TimeHub.Application.TimeLogs.GetTimeLogs;
using TimeHub.Application.TimeLogs.Shared;
using TimeHub.Domain.Abstractions;

namespace TimeHub.Api.Controllers.TimeLogs;

[ApiController]
[Route("api/time-logs")]
public class TimeLogController(ISender sender) : ControllerBase
{
    private readonly ISender _sender = sender;

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var query = new GetTimeLogsQuery();

        Result<IReadOnlyList<TimeLogWeekGroup>> result = await _sender.Send(
            query,
            cancellationToken
        );

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateTimeLogRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new CreateTimeLogCommand(
            request.Description,
            request.Start,
            request.End,
            request.Seconds,
            request.ProjectId
        );

        Result<TimeLogDto> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}
