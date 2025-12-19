using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthCare.Models;

public class DoctorSlot
{
    [Key]
    public Guid SlotId { get; set; } = Guid.NewGuid();

    [Required]
    public Guid DoctorId { get; set; }

    [ForeignKey(nameof(DoctorId))]
    public DoctorProfile? Doctor { get; set; }

    public Guid? PatientId { get; set; }

    [ForeignKey(nameof(PatientId))]
    public PatientProfile? Patient { get; set; }

    [Required]
    public DateTime Date { get; set; }     

    [Required]
    public TimeSpan StartTime { get; set; }      

    [Required]
    public TimeSpan EndTime { get; set; }       

    public bool IsBooked { get; set; } = false;

    // Audit
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
