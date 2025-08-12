using System.Text.Json;
using Google.Apis.Auth;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Common.Configuration;
using Timorya.Application.Users.LoginUser;
using Timorya.Application.Users.RegisterUser;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Shared;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.GoogleOAuth;

internal sealed class GoogleOAuthCommandHandler(
    IApplicationDbContext context,
    ISender sender,
    IOptions<GoogleSettings> googleOptions,
    IOptions<ApplicationSettings> appOptions,
    IHttpClientFactory httpClientFactory
) : ICommandHandler<GoogleOAuthCommand, string>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IHttpClientFactory _httpClientFactory = httpClientFactory;
    private readonly ISender _sender = sender;
    private readonly GoogleSettings _googleSettings = googleOptions.Value;
    private readonly ApplicationSettings _appSettings = appOptions.Value;

    public async Task<Result<string>> Handle(
        GoogleOAuthCommand request,
        CancellationToken cancellationToken
    )
    {
        var clientId = _googleSettings.ClientId;
        var clientSecret = _googleSettings.ClientSecret;
        var redirectUri = _appSettings.ApiUrl + "/api/users/google-callback";

        var http = _httpClientFactory.CreateClient();
        var form = new Dictionary<string, string>
        {
            ["code"] = request.Code,
            ["client_id"] = clientId,
            ["client_secret"] = clientSecret,
            ["redirect_uri"] = redirectUri,
            ["grant_type"] = "authorization_code",
        };
        var tokenResp = await http.PostAsync(
            "https://oauth2.googleapis.com/token",
            new FormUrlEncodedContent(form),
            cancellationToken
        );
        tokenResp.EnsureSuccessStatusCode();
        var tokenJson = await tokenResp.Content.ReadAsStringAsync(cancellationToken);

        using var doc = JsonDocument.Parse(tokenJson);
        var idToken = doc.RootElement.GetProperty("id_token").GetString();

        var payload = await GoogleJsonWebSignature.ValidateAsync(
            idToken!,
            new GoogleJsonWebSignature.ValidationSettings { Audience = [clientId] }
        );

        var email = payload.Email;

        var firstName = payload.GivenName ?? "User";
        var lastName = payload.FamilyName ?? "User";

        var user = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Email == new Email(email), cancellationToken);

        if (user is null)
        {
            var mutation = new RegisterUserCommand(
                firstName,
                lastName,
                email,
                string.Empty,
                string.Empty,
                true
            );

            var registerResult = await _sender.Send(mutation, cancellationToken);

            if (registerResult.IsFailure)
            {
                return Result.Failure<string>(registerResult.Error);
            }
        }

        var command = new LoginUserCommand(email, string.Empty, true);

        var result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return Result.Failure<string>(result.Error);
        }

        var url =
            _appSettings.AppUrl
            + "/login"
            + "?sign-in=true&accessToken="
            + result.Value.AccessToken
            + "&refreshToken="
            + result.Value.RefreshToken;

        return url;
    }
}
