using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Timorya.Api.Controllers.TimeLogs.Models;
using Timorya.Application.TimeLogs.CreateTimeLog;
using Timorya.Application.TimeLogs.DeleteTimeLog;
using Timorya.Application.TimeLogs.GetActiveTimeLog;
using Timorya.Application.TimeLogs.GetTimeLogs;
using Timorya.Application.TimeLogs.Shared;
using Timorya.Application.TimeLogs.UpdateTimeLog;
using Timorya.Domain.Abstractions;

namespace Timorya.Api.Controllers.TimeLogs;

[ApiController]
[Route("api/time-logs")]
public class TimeLogController(ISender sender) : ControllerBase
{
    private readonly ISender _sender = sender;

    [Authorize]
    [HttpGet("active")]
    public async Task<IActionResult> Get(CancellationToken cancellationToken = default)
    {
        var query = new GetActiveTimeLogQuery();

        var result = await _sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        CancellationToken cancellationToken = default
    )
    {
        var query = new GetTimeLogsQuery(page, pageSize);

        var result = await _sender.Send(query, cancellationToken);
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
        var command = new CreateTimeLogCommand(request.Description, request.ProjectId);

        Result<TimeLogDto> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        [FromRoute] int id,
        [FromBody] UpdateTimeLogRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new UpdateTimeLogCommand(
            id,
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

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken)
    {
        var command = new DeleteTimeLogCommand(id);

        Result<bool> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}
