using Timorya.Application.Abstractions.Common;
using Timorya.Application.Common.Interfaces;

namespace Timorya.Infrastructure.Common.Email;

public class EmailTemplateService : IEmailTemplateService
{
    private static string GetEmailTemplate(string templateName)
    {
        var assembly = typeof(EmailTemplateService).Assembly;

        var resourceName = assembly
            .GetManifestResourceNames()
            .FirstOrDefault(n =>
                n.EndsWith($"{templateName}.html", StringComparison.OrdinalIgnoreCase)
            );

        using var stream =
            resourceName != null
                ? assembly.GetManifestResourceStream(resourceName)
                : throw new FileNotFoundException($"Template '{templateName}' not found.");

        if (stream == null)
        {
            throw new FileNotFoundException($"Template stream for '{templateName}' is null.");
        }
        using var reader = new StreamReader(stream);
        return reader.ReadToEnd();
    }

    private static string PopulateTemplate(string template, Dictionary<string, string> values)
    {
        foreach (var pair in values)
        {
            template = template.Replace($"{{{{{pair.Key}}}}}", pair.Value);
        }
        return template;
    }

    public EmailContent NewUserEmailContent(string email, string name)
    {
        var template = GetEmailTemplate("NewUser");
        var values = new Dictionary<string, string> { { "Email", email }, { "Name", name } };
        var content = PopulateTemplate(template, values);

        return EmailContent.CreateForMe("New User Registration", content);
    }

    public EmailContent MemberInvitationContent(
        string inviterName,
        string organizationName,
        string invitationLink
    )
    {
        var template = GetEmailTemplate("MemberInvitation");
        var values = new Dictionary<string, string>
        {
            { "InviterName", inviterName },
            { "OrganizationName", organizationName },
            { "InvitationLink", invitationLink },
        };
        var content = PopulateTemplate(template, values);

        return EmailContent.CreateForMe("Member Invitation", content);
    }

    public EmailContent ContactForm(string email, string subject, string message)
    {
        var template = GetEmailTemplate("ContactForm");
        var values = new Dictionary<string, string>
        {
            { "Email", email },
            { "Subject", subject },
            { "Message", message },
        };
        var content = PopulateTemplate(template, values);

        return EmailContent.CreateForMe("New Contact Form Submission", content);
    }

    public EmailContent ForgotPassword(string email, string resetLink)
    {
        var template = GetEmailTemplate("ForgotPassword");
        var values = new Dictionary<string, string> { { "ResetLink", resetLink } };
        var content = PopulateTemplate(template, values);

        return EmailContent.Create(email, email, "Forgot Password", content);
    }
}
