using TimeHub.Application.Abstractions.Authentication;
using TimeHub.Application.Abstractions.Messaging;
using TimeHub.Application.Errors;
using TimeHub.Domain.Abstractions;
using TimeHub.Domain.Users;

namespace TimeHub.Application.Users.LoginUser;

internal sealed class LoginUserCommandHandler(
    IUserRepository userRepository,
    IJwtService jwtService
) : ICommandHandler<LoginUserCommand, LoginUserResponse>
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IJwtService _jwtService = jwtService;

    public async Task<Result<LoginUserResponse>> Handle(
        LoginUserCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);

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

        return new LoginUserResponse(token);
    }
}
