using FluentValidation;

namespace Timorya.Application.Users.UpdateOrganization;

internal sealed class UpdateOrganizationCommandValidator
    : AbstractValidator<UpdateOrganizationCommand>
{
    public UpdateOrganizationCommandValidator()
    {
        RuleFor(c => c.Name).NotEmpty().MinimumLength(3).MaximumLength(50);
    }
}
