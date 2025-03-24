using FluentValidation;

namespace TimeHub.Application.Projects.UpdateProject;

internal sealed class UpdateProjectCommandValidator : AbstractValidator<UpdateProjectCommand>
{
    public UpdateProjectCommandValidator()
    {
        RuleFor(c => c.Name).NotEmpty().MinimumLength(3).MaximumLength(50);

        RuleFor(c => c.Color).NotEmpty().MinimumLength(3).MaximumLength(50);
    }
}
