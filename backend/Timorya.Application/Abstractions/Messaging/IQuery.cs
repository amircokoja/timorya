using MediatR;
using Timorya.Domain.Abstractions;

namespace Timorya.Application.Abstractions.Messaging;

public interface IQuery<TResponse> : IRequest<Result<TResponse>> { }
