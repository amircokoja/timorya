using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Users.CreateOrganization;

namespace Timorya.Application.Users.UpdateOrganization;

public sealed record UpdateOrganizationCommand(int Id, string Name) : ICommand<OrganizationDto>;
