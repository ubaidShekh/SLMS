// components/TaskCard.js
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPriorityColor, getStatusColor } from "../app/utils/helpers";

const TaskCard = ({ task, onPress, onStatusUpdate }) => {
  const statusColor = getStatusColor(task.status);
  const priorityColor = getPriorityColor(task.priority);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPress={() => onPress(task)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[styles.taskCard, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.taskHeader}>
          <Text style={styles.taskLightId}>{task.lightId}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor + "20" },
            ]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: statusColor }]}
            />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {task.status}
            </Text>
          </View>
        </View>
        <View style={styles.taskLocation}>
          <Ionicons name="location-outline" size={12} color="#6B7280" />
          <Text style={styles.locationText}>{task.location}</Text>
        </View>
        <View style={styles.taskFooter}>
          <View style={styles.priorityBadge}>
            <Ionicons name="flag-outline" size={10} color={priorityColor} />
            <Text style={[styles.priorityText, { color: priorityColor }]}>
              {task.priority}
            </Text>
          </View>
          {task.status !== "Working" && (
            <TouchableOpacity
              style={styles.updateButton}
              activeOpacity={0.7}
              onPress={() => onStatusUpdate()}
            >
              <Text style={styles.updateButtonText}>
                {task.status === "Offline" || task.status === "Fault"
                  ? "Start"
                  : task.status === "In Progress"
                    ? "Complete"
                    : "Update"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 16,

    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  taskLightId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
  },
  statusDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginRight: 3,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "600",
  },
  taskLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 11,
    color: "#6B7280",
    marginLeft: 2,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 2,
  },
  priorityText: {
    fontSize: 9,
    fontWeight: "600",
    marginLeft: 2,
  },
  updateButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 2,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  updateButtonText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default TaskCard;
