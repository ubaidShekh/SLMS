// screens/LoginScreen.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API } from "./api";
import { useStore } from "./store";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToken } = useStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/iot/login", { email, password });
      console.log(res.data);
      if (res.data.success) {
        const token = res.data.token; // 👈 backend से lowercase token आ रहा है

        await AsyncStorage.setItem("Token", token);
        await AsyncStorage.setItem("Name", res.data.user.fullName);
        await AsyncStorage.setItem("Email", res.data.user.email);

        setToken(token); // 👈 सही token pass करो
        router.replace("/(tabs)");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.authContainer}>
        <View style={styles.authCard}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              height: 70,
              width: 100,
              alignContent: "center",
              marginBottom: 0,
              alignSelf: "center",
            }}
          />
          <Text style={styles.authTitle}>Smart Light Monitoring System</Text>
          <Text style={styles.authSubtitle}>Sign in to manage your tasks</Text>
          <View style={styles.inputGroup}>
            <Ionicons
              name="mail-outline"
              size={16}
              color="#6B7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.authInput}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputGroup}>
            <Ionicons
              name="lock-closed-outline"
              size={16}
              color="#6B7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.authInput}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity
            style={styles.authButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.authButtonText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/screens/SignupScreen")}
          >
            <Text style={styles.authLink}>
              New Technician? <Text style={{ color: "#10B981" }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  authCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  authIcon: { alignSelf: "center", marginBottom: 24 },
  authTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0,
  },
  authSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
  },
  inputIcon: { marginRight: 8 },
  authInput: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 14,
    color: "#111827",
  },
  authButton: {
    backgroundColor: "#10B981",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  authButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  authLink: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 12,
    color: "#6B7280",
  },
});

export default LoginScreen;
