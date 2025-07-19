using Microsoft.AspNetCore.Authorization;
using TimeHub.Application.Abstractions.Authorization.Requirements;
using TimeHub.Application.Users;
using TimeHub.Domain.TimeLogs;

namespace TimeHub.Application.Abstractions.Authorization.Handlers;

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
