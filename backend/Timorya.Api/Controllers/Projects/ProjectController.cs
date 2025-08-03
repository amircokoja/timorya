using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Timorya.Api.Controllers.Projects.Models;
using Timorya.Application.Projects.CreateProject;
using Timorya.Application.Projects.DeleteProject;
using Timorya.Application.Projects.GetProject;
using Timorya.Application.Projects.GetProjects;
using Timorya.Application.Projects.Shared;
using Timorya.Application.Projects.UpdateProject;
using Timorya.Domain.Abstractions;

namespace Timorya.Api.Controllers.Projects;

[ApiController]
[Route("api/projects")]
public class ProjectController(ISender sender) : ControllerBase
{
    private readonly ISender _sender = sender;

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        [FromRoute] int id,
        CancellationToken cancellationToken
    )
    {
        var query = new GetProjectQuery(id);

        Result<ProjectDto> result = await _sender.Send(query, cancellationToken);

        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var query = new GetProjectsQuery();

        Result<List<ProjectDto>> result = await _sender.Send(query, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] UpsertProjectRequest request,
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

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        [FromRoute] int id,
        [FromBody] UpsertProjectRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new UpdateProjectCommand(
            id,
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

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken)
    {
        var command = new DeleteProjectCommand(id);

        Result<bool> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}
