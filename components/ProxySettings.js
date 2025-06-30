import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProxySettings = () => {
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [serverAddress, setServerAddress] = useState("");
  const [serverPort, setServerPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [proxyType, setProxyType] = useState("HTTP");
  const [useAuthentication, setUseAuthentication] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  const proxyTypes = ["HTTP", "HTTPS", "SOCKS4", "SOCKS5"];

  useEffect(() => {
    loadProxySettings();
  }, []);

  const loadProxySettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("proxySettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setProxyEnabled(settings.proxyEnabled || false);
        setServerAddress(settings.serverAddress || "");
        setServerPort(settings.serverPort || "");
        setUsername(settings.username || "");
        setPassword(settings.password || "");
        setProxyType(settings.proxyType || "HTTP");
        setUseAuthentication(settings.useAuthentication || false);
      }
    } catch (error) {
      console.log("Error loading proxy settings:", error);
    }
  };

  const saveProxySettings = async () => {
    try {
      const settings = {
        proxyEnabled,
        serverAddress,
        serverPort,
        username,
        password,
        proxyType,
        useAuthentication,
      };
      await AsyncStorage.setItem("proxySettings", JSON.stringify(settings));
      Alert.alert("Success", "Proxy settings saved successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to save proxy settings");
    }
  };

  const testConnection = async () => {
    if (!serverAddress || !serverPort) {
      Alert.alert("Error", "Please enter server address and port");
      return;
    }

    setConnectionStatus("Connecting...");

    // Simulate connection test
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      if (isSuccess) {
        setConnectionStatus("Connected");
        Alert.alert("Success", "Connection test successful!");
      } else {
        setConnectionStatus("Failed");
        Alert.alert(
          "Error",
          "Connection test failed. Please check your settings.",
        );
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
    Alert.alert(
      "Reset Settings",
      "Are you sure you want to reset all proxy settings?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            setProxyEnabled(false);
            setServerAddress("");
            setServerPort("");
            setUsername("");
            setPassword("");
            setProxyType("HTTP");
            setUseAuthentication(false);
            setConnectionStatus("Disconnected");
          },
        },
      ],
    );
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "Connected":
      case "Enabled":
        return "#4CAF50";
      case "Connecting...":
        return "#FF9800";
      case "Failed":
        return "#f44336";
      default:
        return "#666";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Icon name="vpn-lock" size={24} color={getStatusColor()} />
            <Text style={styles.statusTitle}>Proxy Status</Text>
          </View>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {connectionStatus}
          </Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Enable Proxy</Text>
            <Switch
              value={proxyEnabled}
              onValueChange={toggleProxy}
              trackColor={{ false: "#ddd", true: "#2196F3" }}
              thumbColor={proxyEnabled ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Server Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Server Settings</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Proxy Type</Text>
            <TouchableOpacity
              style={styles.typeSelector}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.typeSelectorText}>{proxyType}</Text>
              <Icon name="keyboard-arrow-down" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Server Address</Text>
            <TextInput
              style={styles.input}
              placeholder="proxy.example.com"
              value={serverAddress}
              onChangeText={setServerAddress}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Port</Text>
            <TextInput
              style={styles.input}
              placeholder="8080"
              value={serverPort}
              onChangeText={setServerPort}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Authentication */}
        <View style={styles.section}>
          <View style={styles.toggleContainer}>
            <Text style={styles.sectionTitle}>Authentication</Text>
            <Switch
              value={useAuthentication}
              onValueChange={setUseAuthentication}
              trackColor={{ false: "#ddd", true: "#2196F3" }}
              thumbColor={useAuthentication ? "#fff" : "#f4f3f4"}
            />
          </View>

          {useAuthentication && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.testButton} onPress={testConnection}>
            <Icon name="wifi" size={20} color="#fff" />
            <Text style={styles.buttonText}>Test Connection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveProxySettings}
          >
            <Icon name="save" size={20} color="#fff" />
            <Text style={styles.buttonText}>Save Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
            <Icon name="refresh" size={20} color="#fff" />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Proxy Type Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Proxy Type</Text>
            {proxyTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.modalOption,
                  proxyType === type && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setProxyType(type);
                  setShowModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    proxyType === type && styles.modalOptionTextSelected,
                  ]}
                >
                  {type}
                </Text>
                {proxyType === type && (
                  <Icon name="check" size={20} color="#2196F3" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#333",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleLabel: {
    fontSize: 16,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fafafa",
  },
  typeSelectorText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    gap: 15,
  },
  testButton: {
    backgroundColor: "#FF9800",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: "#f44336",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    minWidth: 250,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  modalOptionSelected: {
    backgroundColor: "#e3f2fd",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },
  modalOptionTextSelected: {
    color: "#2196F3",
    fontWeight: "600",
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProxySettings;
