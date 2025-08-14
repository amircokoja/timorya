using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Errors;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.ChangeUserPassword;

internal sealed class ChangeUserPasswordCommandHandler(
    IApplicationDbContext context,
    ICurrentUserService currentUserService
) : ICommandHandler<ChangeUserPasswordCommand, Unit>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<Unit>> Handle(
        ChangeUserPasswordCommand request,
        CancellationToken cancellationToken
    )
    {
        var userData = _currentUserService.GetCurrentUser();

        var user = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Id == userData.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<Unit>(UserErrors.NotFound);
        }

        if (request.NewPassword != request.ConfirmPassword)
        {
            return Result.Failure<Unit>(UserApplicationErrors.PasswordsDoNotMatch);
        }

        if (!user.IsOAuthUser)
        {
            if (!user.VerifyPassword(request.OldPassword))
            {
                return Result.Failure<Unit>(UserApplicationErrors.InvalidCredentials);
            }
        }

        var newPassword = Password.Create(request.NewPassword);

        if (newPassword.IsFailure)
        {
            return Result.Failure<Unit>(newPassword.Error);
        }

        user.SetPassword(newPassword.Value);

        _context.Set<User>().Update(user);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(Unit.Value);
    }
}
