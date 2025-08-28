using FluentValidation;

namespace Timorya.Application.Users.CreateOrganization;

internal sealed class CreateOrganizationCommandValidator
    : AbstractValidator<CreateOrganizationCommand>
{
    public CreateOrganizationCommandValidator()
    {
        RuleFor(c => c.Name).NotEmpty().MinimumLength(3).MaximumLength(50);
    }
}
