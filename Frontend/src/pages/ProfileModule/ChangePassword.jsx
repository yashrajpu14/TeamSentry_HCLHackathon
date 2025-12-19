import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { notify } from "../../utils/toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validatePasswords = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validatePasswords();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      notify("Please fix the errors", "error");
      return;
    }

    // Password change logic
    notify("Password changed successfully", "success");

    // Reset form after success
    setTimeout(() => {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      navigate("/dashboard");
    }, 1000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  return (
    <div className="change-password-container">
      {/* Header */}
      <header className="password-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={24} />
        </button>
        <h1>Change Password</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <main className="password-main">
        <div className="password-card">
          <div className="password-icon">🔒</div>

          <form onSubmit={handleSubmit} className="password-form">
            <p className="form-description">
              Secure your account by changing your password regularly
            </p>

            {/* Current Password */}
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your current password"
                  className={errors.currentPassword ? "error" : ""}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && (
                <span className="error-message">{errors.currentPassword}</span>
              )}
            </div>

            {/* New Password */}
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your new password"
                  className={errors.newPassword ? "error" : ""}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <span className="error-message">{errors.newPassword}</span>
              )}
              <div className="password-strength">
                <div className="strength-bar"></div>
                <span className="strength-text">
                  {passwordData.newPassword.length >= 8
                    ? "Strong"
                    : passwordData.newPassword.length >= 6
                    ? "Medium"
                    : "Weak"}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your new password"
                  className={errors.confirmPassword ? "error" : ""}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Password Tips */}
            <div className="password-tips">
              <h4>Password Tips:</h4>
              <ul>
                <li>Use at least 8 characters</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Add numbers and special characters</li>
                <li>Avoid using your name or email</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
