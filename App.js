import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, StyleSheet } from "react-native";
import LoginPage from "./components/LoginPage";
import ProxySettings from "./components/ProxySettings";
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Login"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Login") {
                iconName = "account-circle";
              } else if (route.name === "Proxy Settings") {
                iconName = "settings";
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#2196F3",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: styles.tabBar,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          })}
        >
          <Tab.Screen
            name="Login"
            component={LoginPage}
            options={{ title: "Account Login" }}
          />
          <Tab.Screen
            name="Proxy Settings"
            component={ProxySettings}
            options={{ title: "Proxy Settings" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 5,
    height: 60,
  },
  header: {
    backgroundColor: "#2196F3",
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default App;
