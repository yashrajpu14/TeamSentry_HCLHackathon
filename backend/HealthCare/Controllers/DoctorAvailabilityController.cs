// Controllers/DoctorAvailabilityController.cs
using HealthCare.DTOs;
using HealthCare.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthCare.Controllers;

[ApiController]
[Route("api/doctor/availability")]
public class DoctorAvailabilityController : ControllerBase
{
    private readonly IDoctorAvailabilityService _service;

    public DoctorAvailabilityController(IDoctorAvailabilityService service)
    {
        _service = service;
    }

    // POST api/doctor/availability/generate
    [HttpPost("generate")]
    public async Task<IActionResult> Generate(
        [FromBody] SaveDoctorAvailabilityRequest req,
        CancellationToken ct)
    {
        var (ok, error, created) = await _service.GenerateSlotsForDateAsync(req, ct);
        if (!ok) return BadRequest(new { message = error });

        return Ok(new
        {
            message = "Slots regenerated successfully",
            date = req.Date,
            createdSlots = created
        });
    }
}
