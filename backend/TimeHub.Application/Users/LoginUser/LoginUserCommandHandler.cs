using Microsoft.EntityFrameworkCore;
using TimeHub.Application.Abstractions.Authentication;
using TimeHub.Application.Abstractions.Interfaces;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Errors;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Shared;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Users.LoginUser;

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

        if (user == null || !user.VerifyPassword(request.Password))
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
