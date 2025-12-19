// Services/DoctorAvailabilityService.cs
using HealthCare.DTOs;
using HealthCare.Models;
using HealthCare.Repositories.Interfaces;
using HealthCare.Services.Interfaces;

namespace HealthCare.Services;

public class DoctorAvailabilityService : IDoctorAvailabilityService
{
    private readonly IDoctorSlotRepository _repo;

    public DoctorAvailabilityService(IDoctorSlotRepository repo)
    {
        _repo = repo;
    }

    public async Task<(bool ok, string? error, int created)> GenerateSlotsForDateAsync(
        SaveDoctorAvailabilityRequest req,
        CancellationToken ct = default)
    {
        if (req.DoctorId == Guid.Empty)
            return (false, "DoctorId is required.", 0);

        if (!DateOnly.TryParse(req.Date, out var dateOnly))
            return (false, "Invalid date format. Use YYYY-MM-DD.", 0);

        if (req.Slots is null || req.Slots.Count == 0)
            return (false, "Time ranges required.", 0);

        var date = dateOnly.ToDateTime(TimeOnly.MinValue);

        if (!await _repo.DoctorExistsAsync(req.DoctorId, ct))
            return (false, "Doctor not found.", 0);

        // 🔥 DELETE EXISTING SLOTS FOR THAT DAY
        var existingSlots = await _repo.GetSlotsForDateAsync(req.DoctorId, date, ct);
        if (existingSlots.Any())
        {
            await _repo.DeleteSlotsAsync(existingSlots, ct);
        }

        // 🔁 Generate new 1-hour slots
        var newSlots = new List<DoctorSlot>();

        foreach (var r in req.Slots)
        {
            if (!TimeSpan.TryParse(r.Start, out var start) ||
                !TimeSpan.TryParse(r.End, out var end))
                return (false, $"Invalid time range {r.Start}-{r.End}", 0);

            if (end <= start)
                return (false, "End time must be greater than start time.", 0);

            var cursor = start;
            while (cursor.Add(TimeSpan.FromHours(1)) <= end)
            {
                newSlots.Add(new DoctorSlot
                {
                    DoctorId = req.DoctorId,
                    Date = date,
                    StartTime = cursor,
                    EndTime = cursor.Add(TimeSpan.FromHours(1)),
                    IsBooked = false,
                    CreatedAtUtc = DateTime.UtcNow
                });

                cursor = cursor.Add(TimeSpan.FromHours(1));
            }
        }

        await _repo.AddSlotsAsync(newSlots, ct);
        await _repo.SaveAsync(ct);

        return (true, null, newSlots.Count);
    }
}
