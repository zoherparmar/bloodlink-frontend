import { loginUser, setUser } from "@/features/auth/authSlice";
import { BLOOD_GROUPS, type BloodGroup } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import KeyboardAwareScreen from "../components/KeyboardAwareScreen";

type AuthMode = "login" | "signup";

export default function Login() {
  const [mode, setMode] = useState<AuthMode>("login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | null>(null);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isBloodOpen, setIsBloodOpen] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [accountType, setAccountType] = useState<"seeker" | "donor">("seeker");

  const isLogin = mode === "login";

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing fields", "Please enter email and password.");
      return;
    }

    try {
      setIsLoggingIn(true);

      const response = await dispatch(
        loginUser({
          email: email.trim(),
          password,
        }),
      ).unwrap();

      console.log("Login successful:", response);

      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log("Login error:", error);

      const message =
        typeof error === "string"
          ? error
          : error?.message || "Invalid email or password";

      Alert.alert("Login failed", message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async () => {
    const cleanPhone = phone.replace(/[\s-]/g, "");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !phone.trim() ||
      !bloodGroup ||
      !city.trim()
    ) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Invalid password",
        "Password must be at least 6 characters.",
      );
      return;
    }

    if (!/^\+?\d{10,15}$/.test(cleanPhone)) {
      Alert.alert(
        "Invalid phone number",
        "Please enter a valid phone number (10 to 15 digits).",
      );
      return;
    }

    try {
      // UI only for now: skip the backend and go straight into the app
      dispatch(
        setUser({
          id: "local",
          name: fullName.trim(),
          email: email.trim(),
          role: accountType,
          phone: cleanPhone,
          bloodGroup,
          city: city.trim(),
        }),
      );
      router.push("/role");
    } catch (error: unknown) {
      console.log("Signup error:", error);

      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "Signup failed. Please try again.";

      Alert.alert("Signup failed", message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const switchToLogin = () => {
    setMode("login");
  };

  const switchToSignup = () => {
    setMode("signup");
  };

  return (
    <KeyboardAwareScreen>
      <View style={[styles.content, !isLogin && styles.signupContent]}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="water" size={53} color="#D5092F" />
        </View>

        {/* ================= LOGIN ================= */}
        {isLogin ? (
          <>
            <Text style={styles.title}>Welcome back</Text>

            <Text style={styles.subtitle}>
              Log in to find donors or answer requests.
            </Text>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Password</Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {/* Login */}
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
                isLoggingIn && { opacity: 0.6 },
              ]}
              onPress={handleLogin}
              disabled={isLoggingIn}
            >
              <Text style={styles.primaryButtonText}>Log in</Text>
            </Pressable>

            {/* Switch to Signup */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>New to BloodLink? </Text>

              <Pressable onPress={switchToSignup}>
                <Text style={styles.switchLink}>Create account</Text>
              </Pressable>
            </View>

            <Text style={styles.helperText}>
              Wrong email or password shows “Invalid credentials”
            </Text>
          </>
        ) : (
          /* ================= SIGN UP ================= */
          <>
            <View style={styles.signupHeader}>
              <Pressable onPress={switchToLogin}>
                <Text style={styles.backButton}>‹</Text>
              </Pressable>

              <View style={styles.signupHeaderText}>
                <Text style={styles.title}>Create account</Text>
              </View>
            </View>

            {/* Full Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Full name</Text>

              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                autoCapitalize="words"
              />
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Password (min 6 characters)</Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                textContentType="password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {/* Phone number */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone number</Text>

              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {/* Blood group (dropdown) */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Blood group</Text>

              <Pressable
                style={[styles.input, styles.dropdownField]}
                onPress={() => {
                  Keyboard.dismiss();
                  setIsBloodOpen((open) => !open);
                }}
                accessibilityRole="button"
                accessibilityState={{ expanded: isBloodOpen }}
              >
                <Text
                  style={[
                    styles.dropdownValue,
                    !bloodGroup && styles.dropdownPlaceholder,
                  ]}
                >
                  {bloodGroup ?? "Select blood group"}
                </Text>

                <MaterialCommunityIcons
                  name={isBloodOpen ? "chevron-up" : "chevron-down"}
                  size={28}
                  color="#777C89"
                />
              </Pressable>

              {isBloodOpen && (
                <View style={styles.dropdownList}>
                  {BLOOD_GROUPS.map((group, index) => {
                    const isSelected = bloodGroup === group;

                    return (
                      <Pressable
                        key={group}
                        onPress={() => {
                          setBloodGroup(group);
                          setIsBloodOpen(false);
                        }}
                        style={({ pressed }) => [
                          styles.dropdownOption,
                          index < BLOOD_GROUPS.length - 1 &&
                            styles.dropdownOptionBorder,
                          pressed && styles.dropdownOptionPressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            isSelected && styles.dropdownOptionTextSelected,
                          ]}
                        >
                          {group}
                        </Text>

                        {isSelected && (
                          <MaterialCommunityIcons
                            name="check"
                            size={22}
                            color="#D5092F"
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>

            {/* City */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>City</Text>

              <TextInput
                value={city}
                onChangeText={setCity}
                placeholder="Enter your city"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                textContentType="addressCity"
                style={styles.input}
              />
            </View>

            {/* Address */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Address</Text>

              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your full address"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                textContentType="fullStreetAddress"
                style={styles.input}
              />
            </View>

            {/* Create Account */}
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                styles.signupButton,
                pressed && styles.buttonPressed,
                isLoggingIn && { opacity: 0.6 },
              ]}
              onPress={handleSignup}
              disabled={isLoggingIn}
            >
              <Text style={styles.primaryButtonText}>Create account</Text>
            </Pressable>
          </>
        )}
      </View>
    </KeyboardAwareScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1, // was flex: 1
    paddingHorizontal: 44,
    paddingTop: 158,
    paddingBottom: 40,
  },

  signupContent: {
    paddingTop: 45,
  },

  logoContainer: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17,
  },

  title: {
    fontSize: 38,
    lineHeight: 45,
    fontWeight: "700",
    color: "#171B29",
    letterSpacing: -0.8,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "400",
    color: "#777C89",
    marginBottom: 22,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "600",
    color: "#292D39",
    marginBottom: 8,
  },

  input: {
    height: 69,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D9DCE3",
    borderRadius: 16,
    paddingHorizontal: 22,
    fontSize: 19,
    fontWeight: "400",
    color: "#292D39",
  },

  primaryButton: {
    height: 77,
    width: "100%",
    backgroundColor: "#D5092F",
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },

  signupButton: {
    marginTop: 27,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  primaryButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 31,
  },

  switchText: {
    fontSize: 17,
    color: "#858995",
    fontWeight: "400",
  },

  switchLink: {
    fontSize: 17,
    color: "#D5092F",
    fontWeight: "700",
  },

  helperText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 23,
    color: "#858995",
    fontWeight: "400",
    marginTop: 23,
  },

  signupHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },

  backButton: {
    fontSize: 39,
    lineHeight: 39,
    color: "#292D39",
    fontWeight: "300",
    marginRight: 14,
    marginTop: -2,
  },

  signupHeaderText: {
    flex: 1,
  },

  dropdownField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownValue: {
    fontSize: 19,
    color: "#292D39",
  },

  dropdownPlaceholder: {
    color: "#9CA3AF",
  },

  dropdownList: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D9DCE3",
    borderRadius: 16,
    overflow: "hidden",
  },

  dropdownOption: {
    height: 54,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF2",
  },

  dropdownOptionPressed: {
    backgroundColor: "#F6F7FB",
  },

  dropdownOptionText: {
    fontSize: 19,
    color: "#292D39",
  },

  dropdownOptionTextSelected: {
    color: "#C81737",
    fontWeight: "700",
  },

  accountTypeContainer: {
    flexDirection: "row",
    gap: 14,
    marginTop: 0,
    width: "100%",
    alignItems: "stretch",
  },

  accountTypeButton: {
    width: "48%",
    height: 98,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#ECEEF2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },

  accountTypeButtonSelected: {
    borderColor: "#D5092F",
    borderWidth: 2,
  },

  accountTypeTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "700",
    color: "#292D39",
    textAlign: "center",
  },

  accountTypeTitleSelected: {
    color: "#C81737",
  },

  accountTypeSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#858995",
    marginTop: 2,
  },
});
