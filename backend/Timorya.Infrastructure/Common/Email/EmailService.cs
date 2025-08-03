using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Timorya.Application.Abstractions.Common;
using Timorya.Application.Common.Interfaces;
using Timorya.Infrastructure.Common.Models;

namespace Timorya.Infrastructure.Common.Email;

public class EmailService(IOptions<EmailSettings> emailSettings) : IEmailService
{
    private readonly EmailSettings _emailSettings = emailSettings.Value;

    public async Task SendEmailAsync(
        EmailContent mail,
        CancellationToken cancellationToken = default
    )
    {
        var email = new MimeMessage();
        email.From.Add(new MailboxAddress(_emailSettings.Username, _emailSettings.Email));
        email.To.Add(new MailboxAddress(mail.RecipientName, mail.RecipientEmail));
        email.Subject = mail.Subject;

        email.Body = new TextPart("html") { Text = mail.Content };

        using var smtp = new SmtpClient();

        await smtp.ConnectAsync(
            _emailSettings.SmtpServer,
            _emailSettings.SmtpPort,
            SecureSocketOptions.StartTls,
            cancellationToken
        );
        await smtp.AuthenticateAsync(
            _emailSettings.SmtpEmail,
            _emailSettings.SmtpPass,
            cancellationToken
        );
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true, cancellationToken);
    }
}
