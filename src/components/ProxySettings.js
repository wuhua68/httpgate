import React, { useState, useEffect } from "react";
import "./ProxySettings.css";

const ProxySettings = () => {
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [proxyType, setProxyType] = useState("HTTP");
  const [proxyServer, setProxyServer] = useState("");
  const [proxyPort, setProxyPort] = useState("");
  const [pacUrl, setPacUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [useAuthentication, setUseAuthentication] = useState(false);
  const [usePacScript, setUsePacScript] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  const proxyTypes = ["HTTP", "HTTPS", "SOCKS4", "SOCKS5"];

  useEffect(() => {
    loadProxySettings();
  }, []);

  const loadProxySettings = () => {
    try {
      const savedSettings = localStorage.getItem("proxySettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setProxyEnabled(settings.proxyEnabled || false);
        setProxyType(settings.proxyType || "HTTP");
        setProxyServer(settings.proxyServer || "");
        setProxyPort(settings.proxyPort || "");
        setPacUrl(settings.pacUrl || "");
        setUsername(settings.username || "");
        setPassword(settings.password || "");
        setUseAuthentication(settings.useAuthentication || false);
        setUsePacScript(settings.usePacScript || false);
      }
    } catch (error) {
      console.log("Error loading proxy settings:", error);
    }
  };

  const saveProxySettings = () => {
    try {
      const settings = {
        proxyEnabled,
        proxyType,
        proxyServer,
        proxyPort,
        pacUrl,
        username,
        password,
        useAuthentication,
        usePacScript,
      };
      localStorage.setItem("proxySettings", JSON.stringify(settings));
      alert("Proxy settings saved successfully");
    } catch (error) {
      alert("Failed to save proxy settings");
    }
  };

  const testConnection = () => {
    if (usePacScript) {
      if (!pacUrl) {
        alert("Please enter PAC URL");
        return;
      }
    } else {
      if (!proxyServer || !proxyPort) {
        alert("Please enter proxy server and port");
        return;
      }
    }

    setConnectionStatus("Testing...");

    // Simulate connection test
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      if (isSuccess) {
        setConnectionStatus("Connected");
        alert("Connection test successful!");
      } else {
        setConnectionStatus("Failed");
        alert("Connection test failed. Please check your settings.");
      }
    }, 2000);
  };

  const toggleProxy = (value) => {
    setProxyEnabled(value);
    if (value) {
      setConnectionStatus("Enabled");
    } else {
      setConnectionStatus("Disconnected");
    }
  };

  const resetSettings = () => {
    if (window.confirm("Are you sure you want to reset all proxy settings?")) {
      setProxyEnabled(false);
      setProxyType("HTTP");
      setProxyServer("");
      setProxyPort("");
      setPacUrl("");
      setUsername("");
      setPassword("");
      setUseAuthentication(false);
      setUsePacScript(false);
      setConnectionStatus("Disconnected");
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "Connected":
      case "Enabled":
        return "#4CAF50";
      case "Testing...":
        return "#FF9800";
      case "Failed":
        return "#f44336";
      default:
        return "#666";
    }
  };

  return (
    <div className="proxy-container">
      <div className="proxy-content">
        {/* Status Card */}
        <div className="status-card">
          <div className="status-header">
            <span className="status-icon">🔒</span>
            <h3 className="status-title">Proxy Status</h3>
          </div>
          <p className="status-text" style={{ color: getStatusColor() }}>
            {connectionStatus}
          </p>
          <div className="toggle-container">
            <span className="toggle-label">Enable Proxy</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={proxyEnabled}
                onChange={(e) => toggleProxy(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Configuration Mode */}
        <div className="section">
          <h3 className="section-title">Configuration Mode</h3>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="configMode"
                checked={!usePacScript}
                onChange={() => setUsePacScript(false)}
              />
              <span className="radio-label">Manual Proxy Configuration</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="configMode"
                checked={usePacScript}
                onChange={() => setUsePacScript(true)}
              />
              <span className="radio-label">Automatic PAC Script</span>
            </label>
          </div>
        </div>

        {/* PAC Script Configuration */}
        {usePacScript && (
          <div className="section">
            <h3 className="section-title">PAC Script Configuration</h3>
            <div className="input-group">
              <label className="input-label">PAC URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="http://example.com/proxy.pac"
                value={pacUrl}
                onChange={(e) => setPacUrl(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Manual Proxy Configuration */}
        {!usePacScript && (
          <div className="section">
            <h3 className="section-title">Manual Proxy Configuration</h3>

            <div className="input-group">
              <label className="input-label">Proxy Type</label>
              <div
                className="select-wrapper"
                onClick={() => setShowTypeModal(true)}
              >
                <span className="select-value">{proxyType}</span>
                <span className="select-arrow">▼</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Proxy Server</label>
              <input
                type="text"
                className="form-input"
                placeholder="proxy.example.com"
                value={proxyServer}
                onChange={(e) => setProxyServer(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Proxy Port</label>
              <input
                type="number"
                className="form-input"
                placeholder="8080"
                value={proxyPort}
                onChange={(e) => setProxyPort(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Authentication */}
        {!usePacScript && (
          <div className="section">
            <div className="toggle-container">
              <span className="section-title">Authentication</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={useAuthentication}
                  onChange={(e) => setUseAuthentication(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {useAuthentication && (
              <>
                <div className="input-group">
                  <label className="input-label">Username</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="button-container">
          <button className="test-button" onClick={testConnection}>
            <span className="button-icon">🌐</span>
            Test Connection
          </button>

          <button className="save-button" onClick={saveProxySettings}>
            <span className="button-icon">💾</span>
            Save Settings
          </button>

          <button className="reset-button" onClick={resetSettings}>
            <span className="button-icon">🔄</span>
            Reset
          </button>
        </div>
      </div>

      {/* Proxy Type Modal */}
      {showTypeModal && (
        <div className="modal-overlay" onClick={() => setShowTypeModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Select Proxy Type</h3>
            {proxyTypes.map((type) => (
              <div
                key={type}
                className={`modal-option ${proxyType === type ? "selected" : ""}`}
                onClick={() => {
                  setProxyType(type);
                  setShowTypeModal(false);
                }}
              >
                <span className="option-text">{type}</span>
                {proxyType === type && <span className="check-icon">✓</span>}
              </div>
            ))}
            <button
              className="modal-close"
              onClick={() => setShowTypeModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProxySettings;
