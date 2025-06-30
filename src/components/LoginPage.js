import React, { useState, useEffect } from "react";
import "./LoginPage.css";

const LoginPage = ({ onLoginSuccess, onGoToSettings }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    try {
      const savedCredentials = localStorage.getItem("userCredentials");
      if (savedCredentials) {
        const { email: savedEmail } = JSON.parse(savedCredentials);
        setEmail(savedEmail);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Error checking login status:", error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        try {
          localStorage.setItem(
            "userCredentials",
            JSON.stringify({ email, password }),
          );
          setIsLoggedIn(true);
          alert("Login successful!");
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        } catch (error) {
          alert("Failed to save login credentials");
        } finally {
          setIsLoading(false);
        }
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      alert("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("userCredentials");
      setIsLoggedIn(false);
      setEmail("");
      setPassword("");
      alert("Logged out successfully");
    } catch (error) {
      alert("Failed to logout");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <div className="welcome-container">
          <div className="success-icon">✅</div>
          <h2 className="welcome-title">Welcome!</h2>
          <p className="welcome-text">You are logged in as:</p>
          <p className="email-text">{email}</p>

          <div className="status-card">
            <div className="status-row">
              <span className="status-icon">🔒</span>
              <span className="status-text">Proxy Status: Ready</span>
            </div>
            <div className="status-row">
              <span className="status-icon">🛡️</span>
              <span className="status-text">Connection: Secure</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            <span className="button-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          <div className="app-logo">🔐</div>
          <h1 className="app-name">Proxy Mobile</h1>
          <p className="app-description">Secure proxy connection</p>
        </div>

        <div className="form-container">
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                className="form-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            className={`login-button ${isLoading ? "loading" : ""}`}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner">⏳</span>
                Logging in...
              </>
            ) : (
              <>
                <span className="button-icon">🔑</span>
                Login
              </>
            )}
          </button>

          <button className="forgot-password">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
