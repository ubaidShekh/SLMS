// components/CustomTabBar.js
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomTabBar = ({ activeTab, onTabPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (tab) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    onTabPress(tab);
  };

  return (
    <View style={styles.customTabBarContainer}>
      <Animated.View
        style={[styles.customTabBar, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Tasks Tab */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "tasks" && { backgroundColor: "#E8F5E9" },
          ]}
          onPress={() => handlePress("tasks")}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === "tasks" ? "list" : "list-outline"}
            size={20}
            color={activeTab === "tasks" ? "#10B981" : "#9CA3AF"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "tasks" && styles.activeTabLabel,
            ]}
          >
            Tasks
          </Text>
        </TouchableOpacity>

        {/* Completed Tab (NEW) */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "completed" && { backgroundColor: "#E8F5E9" },
          ]}
          onPress={() => handlePress("completed")}
          activeOpacity={0.7}
        >
          <Ionicons
            name={
              activeTab === "completed"
                ? "checkmark-circle"
                : "checkmark-circle-outline"
            }
            size={20}
            color={activeTab === "completed" ? "#10B981" : "#9CA3AF"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "completed" && styles.activeTabLabel,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "profile" && { backgroundColor: "#E8F5E9" },
          ]}
          onPress={() => handlePress("profile")}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === "profile" ? "person" : "person-outline"}
            size={20}
            color={activeTab === "profile" ? "#10B981" : "#9CA3AF"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "profile" && styles.activeTabLabel,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  customTabBarContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "transparent",
  },
  customTabBar: {
    flexDirection: "row",
    height: 54,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 0,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 40,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#9CA3AF",
    marginTop: 2,
  },
  activeTabLabel: {
    color: "#10B981",
    fontWeight: "600",
  },
});

export default CustomTabBar;
