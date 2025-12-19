import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { notify } from "../../utils/toast";
import { userService } from "../../user/user.service";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setPasswordData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validatePasswords = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = "Current password is required";

    if (!passwordData.newPassword) newErrors.newPassword = "New password is required";
    else if (passwordData.newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters";

    if (!passwordData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (passwordData.currentPassword && passwordData.newPassword && passwordData.currentPassword === passwordData.newPassword)
      newErrors.newPassword = "New password must be different from current password";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validatePasswords();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      notify("Please fix the errors", "error");
      return;
    }

    try {
      setLoading(true);
      await userService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      notify("Password changed successfully", "success");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || "Failed to change password";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((p) => ({ ...p, [field]: !p[field] }));
  };

  return (
    <div className="change-password-container">
      <header className="password-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={24} />
        </button>
        <h1>Change Password</h1>
        <div className="header-spacer"></div>
      </header>

      <main className="password-main">
        <div className="password-card">
          <div className="password-icon">🔒</div>

          <form onSubmit={handleSubmit} className="password-form">
            <p className="form-description">Secure your account by changing your password regularly</p>

            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                  className={errors.currentPassword ? "error" : ""}
                />
                <button type="button" className="toggle-btn" onClick={() => togglePasswordVisibility("current")}>
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  className={errors.newPassword ? "error" : ""}
                />
                <button type="button" className="toggle-btn" onClick={() => togglePasswordVisibility("new")}>
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? "error" : ""}
                />
                <button type="button" className="toggle-btn" onClick={() => togglePasswordVisibility("confirm")}>
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Changing..." : "Change Password"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
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
