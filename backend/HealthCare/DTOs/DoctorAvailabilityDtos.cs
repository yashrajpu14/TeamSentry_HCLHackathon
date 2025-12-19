namespace HealthCare.DTOs;

public record AvailabilitySlotDto(string Start, string End);
public record SaveDoctorAvailabilityRequest(Guid DoctorId, string Date, List<AvailabilitySlotDto> Slots);
