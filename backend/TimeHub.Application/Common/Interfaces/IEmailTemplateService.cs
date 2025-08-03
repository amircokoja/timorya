using TimeHub.Application.Abstractions.Common;

namespace TimeHub.Application.Common.Interfaces;

public interface IEmailTemplateService
{
    EmailContent NewUserEmailContent(string email, string name);
    EmailContent ContactForm(string email, string subject, string message);
}
