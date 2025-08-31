using MediatR;
using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.InviteMember;

public sealed record InviteMemberCommand(string Email, int RoleId) : ICommand<Unit>;
