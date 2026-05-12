// screens/SignupScreen.js
import { Ionicons } from "@expo/vector-icons";
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

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (password.length < 4) {
      Alert.alert("Error", "Password must be at least 4 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/iot/createuser", {
        name,
        email,
        password,
      });
      console.log(res.data);
      if (res.data.success) {
        Alert.alert("Success", "Account created successfully");
        router.push("/screens/LoginScreen");
      }
    } catch (er) {
      console.log(er);
      setLoading(false);
      Alert.alert("err");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.authContainer}>
        <View style={styles.authCard}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ height: 70, width: 100, alignSelf: "center" }}
          />
          <Text style={styles.authTitle}>Create Account</Text>
          <Text style={styles.authSubtitle}>Join As a Technician</Text>
          <View style={styles.inputGroup}>
            <Ionicons
              name="person-outline"
              size={16}
              color="#6B7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.authInput}
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>
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
          <View style={styles.inputGroup}>
            <Ionicons
              name="lock-closed-outline"
              size={16}
              color="#6B7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.authInput}
              placeholder="Confirm Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity
            style={styles.authButton}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.authButtonText}>
              {loading ? "Creating account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Text style={styles.authLink}>
              Already have an account?{" "}
              <Text style={{ color: "#10B981" }}>Login</Text>
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
  },
  authSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 22,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 4,
    marginBottom: 12,
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
    paddingVertical: 14,
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
    fontSize: 12,
    fontWeight: "600",
  },
  authLink: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 12,
    color: "#6B7280",
  },
});

export default SignupScreen;
