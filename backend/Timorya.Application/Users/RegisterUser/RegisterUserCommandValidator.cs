using FluentValidation;

namespace Timorya.Application.Users.RegisterUser;

internal sealed class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(c => c.FirstName).NotEmpty().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.LastName).NotEmpty().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.Email).NotEmpty().EmailAddress().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.Password).NotEmpty().MinimumLength(6).MaximumLength(50);
    }
}
