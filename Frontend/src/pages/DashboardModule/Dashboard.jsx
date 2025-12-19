import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
// Importing specific icons for Patient and Doctor cards
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Lock,
  Activity,
  Calendar,
  History,
  Stethoscope,
  Clock,
} from "lucide-react";
import { authService } from "../../auth/auth.service";
import { userService } from "../../user/user.service";
import { notify } from "../../utils/toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // User state
  const [me, setMe] = useState({
    name: "",
    email: "",
    role: "", // "Patient" or "Doctor"
    ProfileImageUrl: "",
  });
  const [loadingMe, setLoadingMe] = useState(true);

  // --- 1. PATIENT CARDS Configuration ---
  const patientCards = [
    {
      id: 1,
      title: "Past Appointments",
      description: "View your previous appointments",
      icon: <History size={40} />,
      path: "/past-appointments",
    },
    {
      id: 2,
      title: "Book Now",
      description: "Book a new appointment instantly",
      icon: <Calendar size={40} />,
      path: "/book-appointment",
    },
    {
      id: 3,
      title: "Goals",
      description: "Track your health goals",
      icon: <Activity size={40} />,
      path: "/goals",
    },
  ];

  // --- 2. DOCTOR CARDS Configuration ---
  const doctorCards = [
    {
      id: 1,
      title: "Past Appointments",
      description: "View patient history logs",
      icon: <History size={40} />,
      path: "/doctor/history",
    },
    {
      id: 2,
      title: "Current Appointments",
      description: "View today's scheduled patients",
      icon: <Stethoscope size={40} />,
      path: "/doctor/appointments",
    },
    {
      id: 3,
      title: "Set Availability",
      description: "Manage your time slots & dates",
      icon: <Clock size={40} />,
      // ✅ LINKED HERE: This path matches the Route in AppRoutes.js
      path: "/doctor/set-availability",
    },
  ];

  // --- 3. Load User Data ---
  useEffect(() => {
    const loadMe = async () => {
      try {
        setLoadingMe(true);
        const data = await userService.getMe();
        setMe({
          name: data?.name ?? "",
          email: data?.email ?? "",
          role: data?.role ?? "Patient", // Default to Patient if role is missing
          ProfileImageUrl: data?.profileImageUrl ?? "avtaar.jpeg",
        });
      } catch (err) {
        // If auth fails, redirect to login
        navigate("/login", { replace: true });
      } finally {
        setLoadingMe(false);
      }
    };

    loadMe();
  }, [navigate]);

  // Handle outside click for profile menu
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!showProfileMenu) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showProfileMenu]);

  // --- 4. Determine Active Cards based on Role ---
  const activeCards = me.role === "Doctor" ? doctorCards : patientCards;

  // Carousel Navigation Handlers
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeCards.length - 1 ? 0 : prev + 1));
  };

  const handleProfileClick = () => setShowProfileMenu((p) => !p);

  const handleViewProfile = () => {
    setShowProfileMenu(false);
    navigate("/profile");
  };

  const handleChangePassword = () => {
    setShowProfileMenu(false);
    navigate("/change-password");
  };

  const handleLogoutClick = async () => {
    try {
      setShowProfileMenu(false);
      await authService.logout();
      notify("Logged out", "success");
      navigate("/login", { replace: true });
    } catch {
      navigate("/login", { replace: true });
    }
  };

  // --- 5. Handle Card Clicks (Navigation) ---
  const handleCardClick = (path) => {
    // If a path is defined in the card object, navigate to it
    if (path) {
      navigate(path);
    } else {
      notify("This module is coming soon!", "info");
    }
  };

  // Calculate visible cards for the carousel (Rotates through the array)
  const visibleCards = [
    activeCards[currentIndex],
    activeCards[(currentIndex + 1) % activeCards.length],
    activeCards[(currentIndex + 2) % activeCards.length],
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-logo">
          <Activity className="logo-icon" size={28} />
          <h1>HealthCare+</h1>
        </div>

        <div className="header-right">
          <div className="profile-section" ref={menuRef}>
            <img
              src={me.ProfileImageUrl}
              alt="Profile"
              className="profile-avatar"
              onClick={handleProfileClick}
              title="Click to view menu"
            />

            {showProfileMenu && (
              <div className="profile-menu">
                <div className="menu-header">
                  {/* Show Role Badge */}
                  <span className={`role-badge ${me.role.toLowerCase()}`}>
                    {me.role}
                  </span>
                </div>
                <div className="menu-item" onClick={handleViewProfile}>
                  <User size={18} />
                  <span>Profile</span>
                </div>

                <div className="menu-item" onClick={handleChangePassword}>
                  <Lock size={18} />
                  <span>Change Password</span>
                </div>

                <div className="menu-item logout" onClick={handleLogoutClick}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>
            {loadingMe
              ? "Loading..."
              : `Welcome, ${me.role === "Doctor" ? "Dr. " : ""}${me.name}`}
          </h2>
          <p>{loadingMe ? "" : "Select an option below to get started"}</p>
        </div>

        {/* Carousel Section */}
        <div className="carousel-section">
          <button className="carousel-btn prev" onClick={handlePrevious}>
            <ChevronLeft size={24} />
          </button>

          <div className="cards-container">
            {visibleCards.map((card, index) => (
              <div
                key={card.id}
                className={`dashboard-card ${index === 0 ? "active" : ""}`}
              >
                <div className="card-icon-wrapper">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button
                  className="card-btn"
                  onClick={() => handleCardClick(card.path)}
                >
                  {me.role === "Doctor" && card.id === 3
                    ? "Manage"
                    : "View More"}
                </button>
              </div>
            ))}
          </div>

          <button className="carousel-btn next" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="carousel-indicators">
          {activeCards.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
