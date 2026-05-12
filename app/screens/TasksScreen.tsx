// screens/TasksScreen.js
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TaskCard from "../../components/TaskCard";
import { API } from "./api";

const TasksScreen = ({
  tasks,
  refreshing,
  onRefresh,
  onTaskPress,
  onStatusUpdate,
}) => {
  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={onTaskPress}
            onStatusUpdate={async () => {
              const res = await API.post("/iot/changetaskstatus", {
                id: item._id,
              });
              if (res.data.success) {
                Alert.alert("Success", "Task status updated");
              }
            }}
          />
        )}
        contentContainerStyle={styles.tasksList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#10B981"
            colors={["#10B981"]}
            progressBackgroundColor="#FFFFFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={64}
              color="#D1D5DB"
            />
            <Text style={styles.emptyTitle}>No tasks assigned</Text>
            <Text style={styles.emptyMessage}>You're all caught up!</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "#F9FAFB" },
  tasksList: { paddingBottom: 100 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
});

export default TasksScreen;
