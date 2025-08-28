using Timorya.Application.Abstractions.Messaging;
using Timorya.Application.Users.CreateOrganization;

namespace Timorya.Application.Users.GetOrganizations;

public sealed record GetOrganizationsQuery() : IQuery<IReadOnlyList<OrganizationDto>>;
