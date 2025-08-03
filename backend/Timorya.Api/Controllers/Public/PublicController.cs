using Microsoft.AspNetCore.Mvc;
using Timorya.Api.Controllers.Public.Models;
using Timorya.Application.Common.Interfaces;

namespace Timorya.Api.Controllers.Public;

[ApiController]
[Route("api/public")]
public class PublicController(
    IEmailService emailService,
    IEmailTemplateService emailTemplateService
) : ControllerBase
{
    private readonly IEmailService _emailService = emailService;
    private readonly IEmailTemplateService _emailTemplateService = emailTemplateService;

    [HttpPost("contact")]
    public async Task<IActionResult> Contact(
        [FromBody] ContactFormRequest request,
        CancellationToken cancellationToken
    )
    {
        var email = _emailTemplateService.ContactForm(
            request.Email,
            request.Subject,
            request.Message
        );

        await _emailService.SendEmailAsync(email, cancellationToken);

        return Ok();
    }
}
