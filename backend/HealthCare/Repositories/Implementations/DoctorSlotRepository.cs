// Repositories/DoctorSlotRepository.cs
using HealthCare.Data;
using HealthCare.Models;
using HealthCare.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthCare.Repositories;

public class DoctorSlotRepository : IDoctorSlotRepository
{
    private readonly AppDbContext _db;
    public DoctorSlotRepository(AppDbContext db) => _db = db;

    public Task<bool> DoctorExistsAsync(Guid doctorId, CancellationToken ct) =>
        _db.DoctorProfiles.AnyAsync(d => d.Id == doctorId, ct);

    public Task<List<DoctorSlot>> GetSlotsForDateAsync(Guid doctorId, DateTime date, CancellationToken ct) =>
        _db.DoctorSlots
           .Where(s => s.DoctorId == doctorId && s.Date == date)
           .ToListAsync(ct);

    public Task DeleteSlotsAsync(List<DoctorSlot> slots, CancellationToken ct)
    {
        _db.DoctorSlots.RemoveRange(slots);
        return Task.CompletedTask;
    }

    public Task AddSlotsAsync(List<DoctorSlot> slots, CancellationToken ct) =>
        _db.DoctorSlots.AddRangeAsync(slots, ct);

    public Task SaveAsync(CancellationToken ct) =>
        _db.SaveChangesAsync(ct);
}
