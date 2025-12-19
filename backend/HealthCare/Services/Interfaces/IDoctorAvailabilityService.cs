// Services/Interfaces/IDoctorAvailabilityService.cs
using HealthCare.DTOs;

namespace HealthCare.Services.Interfaces;

public interface IDoctorAvailabilityService
{
    Task<(bool ok, string? error, int created)> GenerateSlotsForDateAsync(
        SaveDoctorAvailabilityRequest req,
        CancellationToken ct = default);
}
