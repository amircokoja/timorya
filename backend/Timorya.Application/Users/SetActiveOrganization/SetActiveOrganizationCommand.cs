using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.SetActiveOrganization;

public sealed record SetActiveOrganizationCommand(int OrganizationId) : ICommand<Unit>;
