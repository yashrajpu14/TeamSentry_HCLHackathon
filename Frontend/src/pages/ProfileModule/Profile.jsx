import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Medical City, MC 12345",
    dateOfBirth: "1990-01-15",
    bloodType: "O+",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic can be added here
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={24} />
        </button>
        <h1>My Profile</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <main className="profile-main">
        {/* Profile Card */}
        <div className="profile-card">
          {/* Avatar Section */}
          <div className="avatar-section">
            <img
              src="https://via.placeholder.com/120/667eea/ffffff?text=Profile"
              alt="Profile"
              className="large-avatar"
            />
            <h2>{profileData.name}</h2>
            <p className="profile-status">Active Patient</p>
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <div className="info-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-field">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.name}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>
                    <Mail size={16} /> Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.email}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>
                    <Phone size={16} /> Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.phone}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>
                    <MapPin size={16} /> Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.address}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>
                    <Calendar size={16} /> Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>Blood Type</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bloodType"
                      value={profileData.bloodType}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.bloodType}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="info-section">
              <h3>Emergency Contact</h3>
              <div className="info-grid">
                <div className="info-field">
                  <label>Contact Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.emergencyContact}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>Contact Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={profileData.emergencyPhone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{profileData.emergencyPhone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {!isEditing ? (
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
