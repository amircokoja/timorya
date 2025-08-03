using MediatR;
using Microsoft.AspNetCore.Mvc;
using TimeHub.Api.Controllers.Users.Models;
using TimeHub.Application.Users.ForgotPassword;
using TimeHub.Application.Users.LoginUser;
using TimeHub.Application.Users.LoginUserWithRefreshToken;
using TimeHub.Application.Users.RegisterUser;
using TimeHub.Application.Users.ResetPasswordWithToken;
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

    [HttpPost("login-with-refresh-token")]
    public async Task<IActionResult> LoginWithRefreshToken(
        [FromBody] LoginUserWithRefreshTokenRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new LoginUserWithRefreshTokenCommand(request.RefreshToken);

        Result<LoginUserResponse> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(
        [FromBody] ForgotPasswordRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new ForgotPasswordCommand(request.Email);

        Result<Unit> result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }

    [HttpPost("reset-password-with-token")]
    public async Task<IActionResult> ResetPasswordWithToken(
        [FromBody] ResetPasswordWithTokenRequest request,
        CancellationToken cancellationToken
    )
    {
        var query = new ResetPasswordWithTokenCommand(request.Token, request.NewPassword);
        Result<Unit> result = await _sender.Send(query, cancellationToken);
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }
        return Ok();
    }
}
