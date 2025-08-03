using Timorya.Application.Abstractions.Common;

namespace Timorya.Application.Common.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(EmailContent mail, CancellationToken cancellationToken = default);
}
