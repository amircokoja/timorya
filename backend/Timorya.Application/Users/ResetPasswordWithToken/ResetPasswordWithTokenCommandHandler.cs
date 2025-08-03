using MediatR;
using Microsoft.EntityFrameworkCore;
using Timorya.Application.Abstractions.Interfaces;
using Timorya.Application.Abstractions.Messaging;
using Timorya.Domain.Abstractions;
using Timorya.Domain.Users;

namespace Timorya.Application.Users.ResetPasswordWithToken;

internal sealed class ResetPasswordWithTokenCommandHandler(IApplicationDbContext context)
    : ICommandHandler<ResetPasswordWithTokenCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;

    public async Task<Result<Unit>> Handle(
        ResetPasswordWithTokenCommand request,
        CancellationToken cancellationToken
    )
    {
        var token = await _context
            .Set<ForgotPasswordToken>()
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == request.Token, cancellationToken);

        if (token is null || token.ExpiresOnUtc < DateTime.UtcNow)
        {
            return Result.Failure<Unit>(UserErrors.InvalidToken);
        }
        else if (token.ExpiresOnUtc < DateTime.UtcNow)
        {
            await _context
                .Set<ForgotPasswordToken>()
                .Where(t => t.Token == request.Token)
                .ExecuteDeleteAsync(cancellationToken);

            return Result.Failure<Unit>(UserErrors.InvalidToken);
        }

        var dbUser = await _context
            .Set<User>()
            .FirstOrDefaultAsync(u => u.Id == token.UserId, cancellationToken);

        if (dbUser is null)
        {
            return Result.Failure<Unit>(UserErrors.NotFound);
        }

        var newPassword = Password.Create(request.NewPassword);

        if (newPassword.IsFailure)
        {
            return Result.Failure<Unit>(newPassword.Error);
        }

        dbUser.SetPassword(newPassword.Value);
        _context.Set<User>().Update(dbUser);
        await _context.SaveChangesAsync(cancellationToken);

        await _context
            .Set<ForgotPasswordToken>()
            .Where(t => t.UserId == dbUser.Id)
            .ExecuteDeleteAsync(cancellationToken);

        return Result.Success(Unit.Value);
    }
}
