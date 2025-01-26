using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeHub.Api.Controllers.Users.Models;
using TimeHub.Application.Users.LoginUser;
using TimeHub.Application.Users.RegisterUser;
using TimeHub.Domain.Abstractions;

namespace TimeHub.Api.Controllers.Users;

[ApiController]
[Route("api/users")]
public class UsersController(ISender sender) : ControllerBase
{
    private readonly ISender _sender = sender;

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] RegisterUserRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new RegisterUserCommand(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Role,
            request.Password,
            request.ConfirmPassword
        );

        Result<RegisterUserResponse> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginUserRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new LoginUserCommand(request.Email, request.Password);

        Result<LoginUserResponse> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpGet("test")]
    [Authorize]
    public IActionResult GetTestData()
    {
        return Ok(new { Message = "Hello World" });
    }
}
