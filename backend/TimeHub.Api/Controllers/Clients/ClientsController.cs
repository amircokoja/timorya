using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeHub.Api.Controllers.Clients.Models;
using TimeHub.Application.Clients.CreateClient;
using TimeHub.Application.Clients.GetClients;
using TimeHub.Application.Clients.Shared;
using TimeHub.Domain.Abstractions;

namespace TimeHub.Api.Controllers.Clients;

[ApiController]
[Route("api/clients")]
public class ClientController(ISender sender) : ControllerBase
{
    private readonly ISender _sender = sender;

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateClientRequest request,
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
}
