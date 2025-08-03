using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Users.LoginUser;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.LoginUserWithRefreshToken;

internal sealed class LoginUserWithRefreshTokenCommandHandler(
    IApplicationDbContext context,
    IJwtService jwtService
) : ICommandHandler<LoginUserWithRefreshTokenCommand, LoginUserResponse>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IJwtService _jwtService = jwtService;

    public async Task<Result<LoginUserResponse>> Handle(
        LoginUserWithRefreshTokenCommand request,
        CancellationToken cancellationToken
    )
    {
        var refreshToken = await _context
            .Set<RefreshToken>()
            .Include(rt => rt.User)
            .ThenInclude(u => u.UserOrganizations)
            .ThenInclude(u => u.Role)
            .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken, cancellationToken);

        if (refreshToken == null || refreshToken.ExpiresOnUtc < DateTime.UtcNow)
        {
            return Result.Failure<LoginUserResponse>(RefreshTokenErrors.InvalidRefreshToken);
        }

        var role = refreshToken
            .User.UserOrganizations.Where(uo =>
                uo.OrganizationId == refreshToken.User.CurrentOrganizationId
            )
            .Select(r => r.Role)
            .FirstOrDefault();

        var accessToken = _jwtService.GenerateJwtToken(
            refreshToken.UserId,
            refreshToken.User.Email.Value,
            refreshToken.User.CurrentOrganizationId,
            role
        );

        refreshToken.UpdateToken(_jwtService.GenerateRefreshToken());
        await _context.SaveChangesAsync(cancellationToken);

        return new LoginUserResponse(accessToken, refreshToken.Token);
    }
}
