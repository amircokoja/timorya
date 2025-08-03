namespace TimeHub.Api.Controllers.Users.Models;

public class ResetPasswordWithTokenRequest
{
    public string Token { get; set; }
    public string NewPassword { get; set; }
}
