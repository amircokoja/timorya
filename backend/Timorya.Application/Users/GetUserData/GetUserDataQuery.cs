using Timorya.Application.Abstractions.Messaging;

namespace Timorya.Application.Users.GetUserData;

public sealed record GetUserDataQuery() : IQuery<UserDataResponse>;
