using Microsoft.AspNetCore.Authorization;

namespace Timorya.Infrastructure.Authorization;

public sealed class HasPermissionAttribute : AuthorizeAttribute
{
    public HasPermissionAttribute(string permission)
        : base(permission) { }
}
