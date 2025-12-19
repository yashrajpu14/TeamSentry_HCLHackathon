// src/pages/DoctorAvailability/DoctorAvailability.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorAvailability.css";
import { doctorAvailabilityApi } from "../../api/doctorAvailability.api";

const DoctorAvailability = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }]);
  const [loading, setLoading] = useState(false);

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  const addSlotRow = () => setTimeSlots([...timeSlots, { start: "", end: "" }]);

  const removeSlotRow = (index) => {
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots.length ? updatedSlots : [{ start: "", end: "" }]);
  };

  const handleSave = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const validSlots = timeSlots.filter((slot) => slot.start && slot.end);
    if (validSlots.length === 0) {
      alert("Please add at least one valid time slot.");
      return;
    }

    // IMPORTANT: In your backend, DoctorId is DoctorProfile.Id (not User.Id).
    // If you only have userId in localStorage, create an endpoint like:
    // GET /api/doctor/me -> returns doctorProfileId
    const stored = localStorage.getItem("user"); // your code :contentReference[oaicite:0]{index=0}
    const user = stored ? JSON.parse(stored) : null;

    const payload = {
      doctorId,
      date: selectedDate, // "YYYY-MM-DD"
      slots: validSlots.map((s) => ({ start: s.start, end: s.end })),
    };

    setLoading(true);

    try {
      const res = await doctorAvailabilityApi.generate(payload);
      alert(`Slots regenerated for ${selectedDate} (Created: ${res.data.createdSlots})`);
      navigate("/dashboard");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save availability.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="availability-container">
      <div className="availability-card">
        <h2 className="page-title">Set Your Availability</h2>

        <div className="form-group">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="slots-section">
          <label className="form-label">Available Time Slots</label>
          <p className="helper-text">Add the start and end time for your shifts on this day.</p>

          {timeSlots.map((slot, index) => (
            <div key={index} className="slot-row">
              <div className="time-input-group">
                <span className="input-label">Start Time</span>
                <input
                  type="time"
                  value={slot.start}
                  onChange={(e) => handleSlotChange(index, "start", e.target.value)}
                  className="form-input time-input"
                />
              </div>

              <div className="time-input-group">
                <span className="input-label">End Time</span>
                <input
                  type="time"
                  value={slot.end}
                  onChange={(e) => handleSlotChange(index, "end", e.target.value)}
                  className="form-input time-input"
                />
              </div>

              {timeSlots.length > 1 && (
                <button onClick={() => removeSlotRow(index)} className="btn-remove" title="Remove Slot">
                  ✕
                </button>
              )}
            </div>
          ))}

          <button onClick={addSlotRow} className="btn-add-row">
            + Add another time slot
          </button>
        </div>

        <div className="form-actions">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`btn-save ${loading ? "disabled" : ""}`}
          >
            {loading ? "Saving..." : "Confirm Availability"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
