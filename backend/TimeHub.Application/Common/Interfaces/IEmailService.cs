using TimeHub.Application.Abstractions.Common;

namespace TimeHub.Application.Common.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(EmailContent mail, CancellationToken cancellationToken = default);
}
