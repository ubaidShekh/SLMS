// screens/ProfileScreen.js
import { Ionicons } from "@expo/vector-icons";
import AysyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API } from "./api";
import { useStore } from "./store";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { setToken } = useStore();
  const [repairmanName, setRepairmanName] = useState("");
  const [Email, setEmail] = useState("");
  useEffect(() => {
    setLoading(true);
    const getTask = async () => {
      const res = await API.get("/iot/assignedtasks");
      if (res.data.success) {
        setTasks(res.data.data);
        const name = await AysyncStorage.getItem("Name");
        const Email = await AysyncStorage.getItem("Email");
        setRepairmanName(name);
        setEmail(Email);
        setLoading(false);
      }
    };
    getTask();
  }, []);
  const Task = tasks.filter((t) => t.email === Email);
  const completedTasks = Task.filter((t) => t.status === "Working").length;
  const pendingTasks = Task.filter((t) => t.status !== "Working").length;
  const totalTasks = Task.length;

  return (
    <View style={styles.screenContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={60} color="#10B981" />
        </View>
        <Text style={styles.profileName}>{repairmanName}</Text>
        <Text style={styles.profileRole}> Technician</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalTasks}</Text>
          <Text style={styles.statLabel}>Total Tasks</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingTasks}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButtonProfile}
        onPress={async () => {
          await AysyncStorage.removeItem("Token");
          setToken(null);
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={16} color="#FFF" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "#F9FAFB" },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    marginBottom: 0,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: { marginBottom: 0 },
  profileName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  profileRole: { fontSize: 10, color: "#6B7280" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 2,
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: "#10B981",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#6B7280",
  },
  logoutButtonProfile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 4,
    gap: 10,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ProfileScreen;
