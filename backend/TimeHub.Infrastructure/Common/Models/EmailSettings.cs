namespace TimeHub.Infrastructure.Common.Models;

public class EmailSettings
{
    public string SmtpServer { get; set; }
    public int SmtpPort { get; set; }
    public string SmtpEmail { get; set; }
    public string SmtpPass { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
}
