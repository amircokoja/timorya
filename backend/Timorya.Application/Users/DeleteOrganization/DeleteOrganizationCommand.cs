using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.DeleteOrganization;

public sealed record DeleteOrganizationCommand(int OrganizationId) : ICommand<Unit>;
