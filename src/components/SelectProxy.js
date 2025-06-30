import React, { useState } from "react";
import "./SelectProxy.css";

const SelectProxy = ({ onProxySelected }) => {
  const [selectedProxy, setSelectedProxy] = useState("manual");

  const handleSelection = (proxyType) => {
    setSelectedProxy(proxyType);
  };

  const handleContinue = () => {
    onProxySelected(selectedProxy);
  };

  const proxyOptions = [
    {
      id: "manual",
      title: "Manual Proxy Configuration",
      description: "Configure your own proxy settings",
      icon: "⚙️",
      details: "Set up custom proxy server and port",
    },
    {
      id: "uk-digitalocean",
      title: "UK Digital Ocean",
      description: "Fast UK-based proxy server",
      icon: "🇬🇧",
      details: "London datacenter, optimized for Europe",
    },
    {
      id: "us-linode",
      title: "US Linode",
      description: "Reliable US-based proxy server",
      icon: "🇺🇸",
      details: "New York datacenter, optimized for Americas",
    },
  ];

  return (
    <div className="select-proxy-container">
      <div className="select-proxy-content">
        <div className="header-section">
          <div className="proxy-icon">🌐</div>
          <h1 className="page-title">Select Proxy Server</h1>
          <p className="page-description">
            Choose your preferred proxy configuration
          </p>
        </div>

        <div className="proxy-options">
          {proxyOptions.map((option) => (
            <div
              key={option.id}
              className={`proxy-option ${selectedProxy === option.id ? "selected" : ""}`}
              onClick={() => handleSelection(option.id)}
            >
              <div className="option-content">
                <div className="option-header">
                  <span className="option-icon">{option.icon}</span>
                  <div className="option-info">
                    <h3 className="option-title">{option.title}</h3>
                    <p className="option-description">{option.description}</p>
                  </div>
                  <div className="radio-container">
                    <input
                      type="radio"
                      name="proxyType"
                      value={option.id}
                      checked={selectedProxy === option.id}
                      onChange={() => handleSelection(option.id)}
                      className="radio-input"
                    />
                    <span className="radio-custom"></span>
                  </div>
                </div>
                <div className="option-details">
                  <span className="details-text">{option.details}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="action-section">
          <button
            className="continue-button"
            onClick={handleContinue}
            disabled={!selectedProxy}
          >
            <span className="button-icon">➡️</span>
            Continue
          </button>

          <div className="selected-info">
            {selectedProxy && (
              <p className="selection-text">
                Selected:{" "}
                <strong>
                  {proxyOptions.find((opt) => opt.id === selectedProxy)?.title}
                </strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProxy;
