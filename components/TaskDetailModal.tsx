// components/TaskDetailModal.js
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPriorityColor, getStatusColor } from "../app/utils/helpers";

const { width } = Dimensions.get("window");

const TaskDetailModal = ({ visible, task, onClose, onStatusUpdate }) => {
  if (!task) return null;
  const statusColor = getStatusColor(task.status);
  const priorityColor = getPriorityColor(task.priority);

  const handleStatusUpdate = () => {
    onStatusUpdate(task);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { width }]}>
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: "#E5E7EB",
                borderRadius: 2,
              }}
            />
          </View>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Task Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="bulb-outline" size={22} color="#10B981" />
            <Text style={styles.detailLabel}>Light ID:</Text>
            <Text style={styles.detailValue}>{task.lightId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={22} color="#10B981" />
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{task.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="alert-circle-outline"
              size={22}
              color={statusColor}
            />
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[styles.detailValue, { color: statusColor }]}>
              {task.status}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="flag-outline" size={22} color={priorityColor} />
            <Text style={styles.detailLabel}>Priority:</Text>
            <Text style={[styles.detailValue, { color: priorityColor }]}>
              {task.priority}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={22} color="#6B7280" />
            <Text style={styles.detailLabel}>Assigned:</Text>
            <Text style={styles.detailValue}>{task.assignedAt}</Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionText}>{task.description}</Text>
          </View>

          {task.status !== "Working" && (
            <TouchableOpacity
              style={styles.modalUpdateButton}
              onPress={handleStatusUpdate}
            >
              <Text style={styles.modalUpdateButtonText}>
                {task.status === "Offline" || task.status === "Fault"
                  ? "Start Work"
                  : task.status === "In Progress"
                    ? " Complete"
                    : "Update "}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",

    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 2,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6B7280",
    width: 80,
    marginLeft: 4,
  },
  detailValue: {
    fontSize: 11,
    fontWeight: "500",
    color: "#111827",
    flex: 1,
  },
  descriptionBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 2,
    padding: 16,
    marginTop: 8,
  },
  descriptionLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 20,
  },
  modalUpdateButton: {
    backgroundColor: "#10B981",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  modalUpdateButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default TaskDetailModal;
