using FluentValidation;

namespace TimeHub.Application.Clients.CreateClient;

internal sealed class CreateClientCommandValidator : AbstractValidator<CreateClientCommand>
{
    public CreateClientCommandValidator()
    {
        RuleFor(c => c.FirstName).NotEmpty().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.LastName).NotEmpty().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.Email).NotEmpty().EmailAddress().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.Address).NotEmpty().MinimumLength(3).MaximumLength(200);

        RuleFor(c => c.Color).NotEmpty().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.Currency).NotEmpty().MinimumLength(3).MaximumLength(10);
    }
}
