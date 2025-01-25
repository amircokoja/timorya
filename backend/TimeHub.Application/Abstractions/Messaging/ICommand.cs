using MediatR;
using TimeHub.Domain.Abstractions;

namespace TimeHub.Application.Abstractions.Messaging;

public interface ICommand : IRequest<Result>, IBaseCommand { }

public interface ICommand<TReponse> : IRequest<Result<TReponse>>, IBaseCommand { }

public interface IBaseCommand { }
