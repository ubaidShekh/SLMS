// App.js
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTabBar from "../../components/CustomTabBar";
import SplashScreen from "../../components/splash";
import TaskDetailModal from "../../components/TaskDetailModal";
import { API } from "../screens/api";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useStore } from "../screens/store";
import TasksScreen from "../screens/TasksScreen";
import { generateAssignedTasks } from "../utils/helpers";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repairmanName, setRepairmanName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [splash, setSplash] = useState(true);
  const { token, setToken } = useStore();

  useEffect(() => {
    setTimeout(() => setSplash(false), 1500);
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) {
        setToken(Token);
      }
    };
    const getEmail = async () => {
      const Email = await AsyncStorage.getItem("Email");
      if (Email) {
        setRepairmanName(Email);
      }
    };
    getToken();
    getEmail();
  }, []);

  const getTask = async () => {
    const res = await API.get("/iot/assignedtasks");
    if (res.data.success) {
      setTasks(res.data.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (repairmanName) {
      setLoading(true);
      getTask();
    }
  }, [repairmanName]);
  // Filter completed tasks

  const Task = tasks.filter((t) => t.email === repairmanName);
  const completedTasks = Task.filter((task) => task.status === "Working");
  const activeTasks = Task.filter((task) => task.status !== "Working");
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setTasks(generateAssignedTasks());
      setRefreshing(false);
    }, 1000);
  };

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleStatusUpdate = async (id) => {
    const res = await API.post("/iot/changetaskstatus", { id });
    try{
    if (res.data.success) {
         setRefreshing(true);
         setTimeout(() => {
           getTask();
           setRefreshing(false);
         }, 1000);
         

      Alert.alert("Success", "Task status updated successfully");
    
     
  
    }
  }
  catch(err){
    Alert.alert("Error", "Failed to update task status");
  }
    
  };

  if (splash) {
    return <SplashScreen />;
  }
  if (!token) {
    return <LoginScreen />;
  }
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.appHeader}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 65, height: 50 }}
        />
        <View style={{ position: "absolute", left: 60, top: 55 }}>
          <Text style={styles.appHeaderTitle}>SLMS</Text>
          <Text
            style={{
              color: "#555",
              fontWeight: "400",
              letterSpacing: 0.3,
              paddingBottom: 5,
              fontSize: 11,
            }}
          >
            Smart Light Monitoring System
          </Text>
        </View>
      </View>

      {activeTab === "tasks" && (
        <TasksScreen
          tasks={activeTasks}
          refreshing={refreshing}
          onRefresh={getTask}
          onTaskPress={handleTaskPress}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
      {activeTab === "completed" && (
        <TasksScreen
          tasks={completedTasks}
          refreshing={refreshing}
          onRefresh={getTask}
          onTaskPress={handleTaskPress}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
      {activeTab === "profile" && <ProfileScreen />}

      <CustomTabBar activeTab={activeTab} onTabPress={setActiveTab} />

      <TaskDetailModal
        visible={modalVisible}
        task={selectedTask}
        onClose={() => setModalVisible(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  loadingText: { marginTop: 12, fontSize: 14, color: "#6B7280" },
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    paddingTop: 50,
  },
  appHeaderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 0,
    letterSpacing: 1,
    fontFamily:
      Platform.OS === "ios" ? "AvenirNext-Bold" : "sans-serif-condensed",
  },
});
