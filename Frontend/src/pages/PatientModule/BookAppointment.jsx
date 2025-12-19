import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const navigate = useNavigate();

  // --- State Management ---
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selection State
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingProcessing, setBookingProcessing] = useState(false);

  // --- 1. Fetch Doctors from Backend ---
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // REPLACE THIS URL with your actual backend endpoint (e.g., 'http://localhost:5000/api/doctors')
        // const response = await fetch('YOUR_API_URL_HERE');
        // const data = await response.json();

        // --- MOCK DATA (Simulating backend response) ---
        // We simulate a 1-second delay to look like a real network request
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockData = [
          {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            image:
              "https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff",
            slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"], // 1 hour slots
          },
          {
            id: 2,
            name: "Dr. Mike Ross",
            specialty: "Dermatologist",
            image:
              "https://ui-avatars.com/api/?name=Mike+Ross&background=6c757d&color=fff",
            slots: ["10:00 AM", "01:00 PM", "03:00 PM", "04:00 PM"],
          },
          {
            id: 3,
            name: "Dr. Emily Blunt",
            specialty: "Pediatrician",
            image:
              "https://ui-avatars.com/api/?name=Emily+Blunt&background=28a745&color=fff",
            slots: ["09:00 AM", "11:00 AM"],
          },
        ];

        setDoctors(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors. Please try again later.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // --- 2. Handle Doctor Selection ---
  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null); // Reset slot if user switches doctor
  };

  // --- 3. Handle Booking Submission ---
  const handleBookNow = async () => {
    if (!selectedDoctor || !selectedSlot) return;

    setBookingProcessing(true);

    const bookingPayload = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      timeSlot: selectedSlot,
      date: new Date().toISOString().split("T")[0], // Booking for today (simplified)
    };

    console.log("Sending to Backend:", bookingPayload);

    try {
      // REPLACE with your actual POST request
      // const res = await fetch('YOUR_API/book', { method: 'POST', body: JSON.stringify(bookingPayload) ... })

      // Simulate API call success
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(
        `Success! Appointment booked with ${selectedDoctor.name} at ${selectedSlot}`
      );

      // Navigate to a success page or home
      navigate("/");
    } catch (err) {
      alert("Booking failed.");
    } finally {
      setBookingProcessing(false);
    }
  };

  // --- Render Helpers ---
  if (loading) return <div style={styles.center}>Loading doctors...</div>;
  if (error)
    return <div style={{ ...styles.center, color: "red" }}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Book an Appointment</h1>

      <div style={styles.layout}>
        {/* Left Side: Doctor List */}
        <div style={styles.doctorList}>
          <h3>Select a Doctor</h3>
          <div style={styles.grid}>
            {doctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleDoctorClick(doc)}
                style={{
                  ...styles.card,
                  border:
                    selectedDoctor?.id === doc.id
                      ? "2px solid #007bff"
                      : "1px solid #ddd",
                  backgroundColor:
                    selectedDoctor?.id === doc.id ? "#f0f8ff" : "#fff",
                }}
              >
                <img src={doc.image} alt={doc.name} style={styles.avatar} />
                <div>
                  <div style={styles.docName}>{doc.name}</div>
                  <div style={styles.docSpecialty}>{doc.specialty}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Time Slots & Action */}
        <div style={styles.detailsPanel}>
          {selectedDoctor ? (
            <>
              <h3>Available Slots for {selectedDoctor.name}</h3>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                All slots are 1 hour duration
              </p>

              <div style={styles.slotGrid}>
                {selectedDoctor.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      ...styles.slotBtn,
                      backgroundColor:
                        selectedSlot === slot ? "#007bff" : "#fff",
                      color: selectedSlot === slot ? "#fff" : "#333",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div style={styles.actionArea}>
                <p>
                  Selected: <strong>{selectedSlot || "None"}</strong>
                </p>
                <button
                  onClick={handleBookNow}
                  disabled={!selectedSlot || bookingProcessing}
                  style={{
                    ...styles.bookBtn,
                    opacity: !selectedSlot || bookingProcessing ? 0.5 : 1,
                    cursor:
                      !selectedSlot || bookingProcessing
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {bookingProcessing ? "Booking..." : "Confirm Appointment"}
                </button>
              </div>
            </>
          ) : (
            <div style={styles.placeholder}>
              <p>
                Please select a doctor from the list to view available time
                slots.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Simple Inline Styles for Quick Prototyping ---
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },
  layout: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
  },
  doctorList: {
    flex: "1",
    minWidth: "300px",
  },
  detailsPanel: {
    flex: "1",
    minWidth: "300px",
    borderLeft: "1px solid #eee",
    paddingLeft: "30px",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  docName: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  docSpecialty: {
    color: "#666",
    fontSize: "0.9rem",
  },
  slotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    gap: "10px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  slotBtn: {
    padding: "10px",
    border: "1px solid #007bff",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
  },
  actionArea: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  bookBtn: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "10px",
  },
  placeholder: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
    textAlign: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.2rem",
  },
};

export default BookAppointment;
