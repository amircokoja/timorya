using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeHub.Api.Controllers.Projects.Models;
using TimeHub.Application.Projects.CreateProject;
using TimeHub.Application.Projects.Shared;
using TimeHub.Domain.Abstractions;

namespace TimeHub.Api.Controllers.Projects;

[ApiController]
[Route("api/projects")]
public class ProjectController(ISender sender) : ControllerBase
{
    private readonly ISender _sender = sender;

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateProjectRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new CreateProjectCommand(
            request.Name,
            request.Color,
            request.IsPublic,
            request.IsBillable,
            request.HourlyRate,
            request.ClientId
        );

        Result<ProjectDto> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}
