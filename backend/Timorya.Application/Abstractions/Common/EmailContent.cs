namespace Timorya.Application.Abstractions.Common;

public class EmailContent(
    string recipientName,
    string recipientEmail,
    string subject,
    string content
)
{
    public string RecipientName { get; set; } = recipientName;
    public string RecipientEmail { get; set; } = recipientEmail;
    public string Subject { get; set; } = subject;
    public string Content { get; set; } = content;

    public static EmailContent CreateForMe(string subject, string content)
    {
        return new EmailContent("Timorya", "info@timorya.com", subject, content);
    }

    public static EmailContent Create(
        string recipientName,
        string recipientEmail,
        string subject,
        string content
    )
    {
        return new EmailContent(recipientName, recipientEmail, subject, content);
    }
}
