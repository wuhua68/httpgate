import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProxySettings from "./components/ProxySettings";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("login");

  // Prevent any unhandled events
  const handleTabClick = (tabName) => {
    try {
      setActiveTab(tabName);
    } catch (error) {
      console.error("Error switching tabs:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "login":
        return <LoginPage />;
      case "settings":
        return <ProxySettings />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <Router>
      <div className="app">
        <div className="app-header">
          <h1 className="app-title">
            {activeTab === "login" ? "Account Login" : "Proxy Settings"}
          </h1>
        </div>

        <div className="app-content">{renderContent()}</div>

        <div className="app-nav">
          <button
            className={`nav-item ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabClick("login")}
            type="button"
          >
            <span className="nav-icon">👤</span>
            <span className="nav-label">Login</span>
          </button>
          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => handleTabClick("settings")}
            type="button"
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Settings</span>
          </button>
        </div>
      </div>
    </Router>
  );
};

export default App;
