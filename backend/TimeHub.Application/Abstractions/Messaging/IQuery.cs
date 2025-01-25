using MediatR;
using TimeHub.Domain.Abstractions;

namespace TimeHub.Application.Abstractions.Messaging;

public interface IQuery<TResponse> : IRequest<Result<TResponse>> { }
