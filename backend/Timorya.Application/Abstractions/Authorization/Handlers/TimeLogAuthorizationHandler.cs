using Microsoft.AspNetCore.Authorization;
using Timorya.Application.Abstractions.Authorization.Requirements;
using Timorya.Application.Users;
using Timorya.Domain.TimeLogs;

namespace Timorya.Application.Abstractions.Authorization.Handlers;

public class TimeLogAuthorizationHandler(ICurrentUserService currentUserService)
    : AuthorizationHandler<TimeLogAuthorizationRequirement, TimeLog>
{
    private readonly ICurrentUserService _currentUserService = currentUserService;

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        TimeLogAuthorizationRequirement requirement,
        TimeLog timeLog
    )
    {
        var user = _currentUserService.GetCurrentUser();

        if (timeLog.UserId == user?.UserId)
        {
            context.Succeed(requirement);
        }
        else
        {
            context.Fail();
        }

        return Task.CompletedTask;
    }
}
