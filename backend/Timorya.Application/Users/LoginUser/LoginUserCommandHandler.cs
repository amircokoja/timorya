using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Authentication;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Errors;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Shared;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.LoginUser;

internal sealed class LoginUserCommandHandler(IApplicationDbContext context, IJwtService jwtService)
    : ICommandHandler<LoginUserCommand, LoginUserResponse>
{
    private readonly IJwtService _jwtService = jwtService;
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<LoginUserResponse>> Handle(
        LoginUserCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _context
            .Set<User>()
            .Include(u => u.UserOrganizations)
            .ThenInclude(uo => uo.Role)
            .FirstOrDefaultAsync(u => u.Email == new Email(request.Email), cancellationToken);

        if (user == null || (!request.IsOAuth && !user.VerifyPassword(request.Password)))
        {
            return Result.Failure<LoginUserResponse>(UserApplicationErrors.InvalidCredentials);
        }

        var role = user
            .UserOrganizations.Where(uo => uo.OrganizationId == user.CurrentOrganizationId)
            .Select(r => r.Role)
            .FirstOrDefault();

        var token = _jwtService.GenerateJwtToken(
            user.Id,
            user.Email.Value,
            user.CurrentOrganizationId,
            role
        );

        // Saving refresh token to the database
        var refreshTokenValue = _jwtService.GenerateRefreshToken();
        var refreshToken = new RefreshToken(refreshTokenValue, user.Id, DateTime.UtcNow.AddDays(7));
        _context.Set<RefreshToken>().Add(refreshToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new LoginUserResponse(token, refreshTokenValue);
    }
}
