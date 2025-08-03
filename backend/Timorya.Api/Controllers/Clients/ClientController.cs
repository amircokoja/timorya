using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Timorya.Api.Controllers.Clients.Models;
using Timorya.Application.Clients.CreateClient;
using Timorya.Application.Clients.DeleteClient;
using Timorya.Application.Clients.GetClient;
using Timorya.Application.Clients.GetClients;
using Timorya.Application.Clients.Shared;
using Timorya.Application.Clients.UpdateClient;
using Timorya.Domain.Abstractions;

namespace Timorya.Api.Controllers.Clients;

[ApiController]
[Route("api/clients")]
public class ClientController(ISender sender) : ControllerBase
{
    private readonly ISender _sender = sender;

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var query = new GetClientsQuery();

        Result<List<ClientDto>> result = await _sender.Send(query, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        [FromRoute] int id,
        CancellationToken cancellationToken
    )
    {
        var query = new GetClientQuery(id);

        Result<ClientDto> result = await _sender.Send(query, cancellationToken);

        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] UpsertClientRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new CreateClientCommand(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Address,
            request.Currency,
            request.Color
        );

        Result<ClientDto> result = await _sender.Send(command, cancellationToken);

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
        [FromBody] UpsertClientRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new UpdateClientCommand(
            id,
            request.FirstName,
            request.LastName,
            request.Email,
            request.Address,
            request.Currency,
            request.Color
        );

        Result<ClientDto> result = await _sender.Send(command, cancellationToken);

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
        var command = new DeleteClientCommand(id);

        Result<bool> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}
