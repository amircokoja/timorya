using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.CreateOrganization;

public sealed record CreateOrganizationCommand(string Name, bool IsPersonalWorkspace)
    : ICommand<OrganizationDto>;
