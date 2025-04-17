using FluentValidation;

namespace TimeHub.Application.Projects.CreateProject;

internal sealed class CreateProjectCommandValidator : AbstractValidator<CreateProjectCommand>
{
    public CreateProjectCommandValidator()
    {
        RuleFor(c => c.Name).NotEmpty().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.Color).NotEmpty().MinimumLength(3).MaximumLength(50);
    }
}
