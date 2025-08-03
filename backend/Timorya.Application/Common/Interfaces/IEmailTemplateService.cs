using Timorya.Application.Abstractions.Common;

namespace Timorya.Application.Common.Interfaces;

public interface IEmailTemplateService
{
    EmailContent NewUserEmailContent(string email, string name);
    EmailContent ContactForm(string email, string subject, string message);
    EmailContent ForgotPassword(string email, string resetLink);
}
