using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Common.Configuration;
using Timorya.Domain.Users;

namespace Timorya.Infrastructure.Authentication;

public class JwtService(IOptions<JwtSettings> options) : IJwtService
{
    private readonly JwtSettings _jwtSettings = options.Value;

    public string GenerateJwtToken(int userId, string email, int? organizationId, Role? role)
    {
        var expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new(JwtRegisteredClaimNames.Email, email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Exp, expires.ToString()),
        };

        if (organizationId.HasValue)
        {
            claims.Add(new(JwtCustomClaimNames.Organization, organizationId.Value.ToString()));
        }

        if (role != null)
        {
            claims.Add(new(ClaimTypes.Role, role.Name));
        }

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: expires,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }

    public string GenerateRefreshToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    }
}
