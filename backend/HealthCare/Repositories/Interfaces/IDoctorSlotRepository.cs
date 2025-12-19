// Repositories/Interfaces/IDoctorSlotRepository.cs
using HealthCare.Models;

namespace HealthCare.Repositories.Interfaces;

public interface IDoctorSlotRepository
{
    Task<bool> DoctorExistsAsync(Guid doctorId, CancellationToken ct);
    Task<List<DoctorSlot>> GetSlotsForDateAsync(Guid doctorId, DateTime date, CancellationToken ct);
    Task DeleteSlotsAsync(List<DoctorSlot> slots, CancellationToken ct);
    Task AddSlotsAsync(List<DoctorSlot> slots, CancellationToken ct);
    Task SaveAsync(CancellationToken ct);
}
