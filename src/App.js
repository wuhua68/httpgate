import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SelectProxy from "./components/SelectProxy";
import ProxySettings from "./components/ProxySettings";
import "./App.css";

const App = () => {
  const [currentView, setCurrentView] = useState("login"); // login, selectProxy, main
  const [activeTab, setActiveTab] = useState("login");
  const [selectedProxyType, setSelectedProxyType] = useState(null);

  // Handle login success
  const handleLoginSuccess = () => {
    setCurrentView("selectProxy");
  };

  // Handle proxy selection
  const handleProxySelected = (proxyType) => {
    setSelectedProxyType(proxyType);
    setCurrentView("main");
    setActiveTab("settings"); // Start with settings tab after proxy selection
  };

  // Prevent any unhandled events
  const handleTabClick = (tabName) => {
    try {
      setActiveTab(tabName);
    } catch (error) {
      console.error("Error switching tabs:", error);
    }
  };

  // Render different views based on current state
  if (currentView === "login") {
    return (
      <Router>
        <div className="app">
          <div className="app-header">
            <h1 className="app-title">Account Login</h1>
          </div>
          <div className="app-content">
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      </Router>
    );
  }

  if (currentView === "selectProxy") {
    return (
      <Router>
        <div className="app">
          <div className="app-header">
            <h1 className="app-title">Select Proxy</h1>
          </div>
          <div className="app-content">
            <SelectProxy onProxySelected={handleProxySelected} />
          </div>
        </div>
      </Router>
    );
  }

  // Main app with navigation
  const renderContent = () => {
    switch (activeTab) {
      case "login":
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case "settings":
        return <ProxySettings selectedProxyType={selectedProxyType} />;
      default:
        return <ProxySettings selectedProxyType={selectedProxyType} />;
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
