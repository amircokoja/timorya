using MediatR;
using Timorya.Domain.Abstractions;

namespace Timorya.Application.Abstractions.Messaging;

public interface ICommand : IRequest<Result>, IBaseCommand { }

public interface ICommand<TReponse> : IRequest<Result<TReponse>>, IBaseCommand { }

public interface IBaseCommand { }
