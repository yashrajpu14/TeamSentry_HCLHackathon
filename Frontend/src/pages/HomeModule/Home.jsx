import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // --- 1. Check Login Status ---
  // We check if a user is stored in localStorage (or use your AuthContext here)
  const user = localStorage.getItem("user");

  // --- 2. Handle 'Book Now' Click ---
  const handleBookNow = () => {
    if (user) {
      // User is logged in -> Go straight to booking
      navigate("/book-appointment");
    } else {
      // User is NOT logged in -> Go to Login first
      // We pass "state" so the Login page knows where to go after success
      navigate("/login", { state: { from: "/book-appointment" } });
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      text: "The doctors were incredibly professional. I felt safe and cared for.",
    },
    {
      id: 2,
      name: "Mike T.",
      text: "Booking an appointment was so easy. Highly recommend MediCare+.",
    },
    {
      id: 3,
      name: "Emily R.",
      text: "Great facilities and very clean environment. 5 stars!",
    },
    {
      id: 4,
      name: "David K.",
      text: "The specialists really took the time to listen to my concerns.",
    },
    {
      id: 5,
      name: "Jessica L.",
      text: "Fast service and friendly staff. Will definitely come back.",
    },
    {
      id: 6,
      name: "Robert B.",
      text: "Top-notch technology and very modern clinic.",
    },
    {
      id: 7,
      name: "Linda W.",
      text: "Pediatric care was excellent. My kids actually enjoyed the visit.",
    },
    {
      id: 8,
      name: "James P.",
      text: "Affordable and transparent pricing. No hidden fees.",
    },
  ];

  return (
    <div className="home-container">
      {/* --- Navigation Bar --- */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>MediCare+</h2>
        </div>
        <div className="navbar-links">
          <a href="#contact" className="nav-link">
            Contact Us
          </a>

          {/* Conditional Navigation: Show Dashboard if logged in, else Show Login/Signup */}
          {user ? (
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="main-content">
        <section className="hero">
          <div className="hero-text">
            <h1>Your Health, Our Priority</h1>
            <p>Book appointments with top specialists instantly.</p>

            {/* --- UPDATED BUTTON with onClick handler --- */}
            <button className="btn btn-primary large" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </section>

        {/* --- Facilities Section --- */}
        <section className="info-section">
          <h3>Our Facilities</h3>
          <div className="photo-grid">
            <div className="card">
              <p>Modern Infrastructure</p>
            </div>
            <div className="card">
              <p>Expert Specialists</p>
            </div>
            <div className="card">
              <p>24/7 Care</p>
            </div>
          </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="testimonials-section">
          <h3>Patient Stories</h3>
          <div className="slider-container">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <p>"{t.text}"</p>
                <h4>- {t.name}</h4>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 MediCare+. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
