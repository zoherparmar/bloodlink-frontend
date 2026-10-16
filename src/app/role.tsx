import { setUser } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Role = "seeker" | "donor";

const TABS = [
  {
    key: "seeker",
    label: "Find blood",
    subtitle: "Seeker",
    icon: "magnify",
    title: "Find blood donors",
    description:
      "Search donors by blood group and city, then send a request straight to them.",
    button: "Continue as seeker",
  },
  {
    key: "donor",
    label: "Donate blood",
    subtitle: "Donor",
    icon: "hand-heart",
    title: "Become a donor",
    description:
      "Create your donor profile and answer requests from people who need blood.",
    button: "Continue as donor",
  },
] as const;

export default function RoleScreen() {
  const [selected, setSelected] = useState<Role>("seeker");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const tab = TABS.find((t) => t.key === selected) ?? TABS[0];

  const handleContinue = () => {
    if (user) {
      dispatch(setUser({ ...user, role: selected }));
    }

    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backButton}>‹</Text>
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.title}>How will you use BloodLink?</Text>
            <Text style={styles.subtitle}>You can change this later.</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {TABS.map((t) => {
            const isSelected = selected === t.key;

            return (
              <Pressable
                key={t.key}
                onPress={() => setSelected(t.key)}
                style={[styles.tab, isSelected && styles.tabSelected]}
                accessibilityRole="tab"
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  style={[
                    styles.tabTitle,
                    isSelected && styles.tabTitleSelected,
                  ]}
                >
                  {t.label}
                </Text>

                <Text style={styles.tabSubtitle}>{t.subtitle}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Tab content */}
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name={tab.icon} size={40} color="#D5092F" />
          </View>

          <Text style={styles.cardTitle}>{tab.title}</Text>
          <Text style={styles.cardText}>{tab.description}</Text>
        </View>

        {/* Continue */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.primaryButtonText}>{tab.button}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  content: {
    flex: 1,
    paddingHorizontal: 44,
    paddingTop: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },

  backButton: {
    fontSize: 39,
    lineHeight: 39,
    color: "#292D39",
    fontWeight: "300",
    marginRight: 14,
    marginTop: -2,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "700",
    color: "#171B29",
    letterSpacing: -0.8,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 19,
    lineHeight: 26,
    color: "#777C89",
  },

  tabBar: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 22,
  },

  tab: {
    flex: 1,
    height: 88,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#ECEEF2",
    justifyContent: "center",
    alignItems: "center",
  },

  tabSelected: {
    borderColor: "#D5092F",
    borderWidth: 2,
  },

  tabTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "700",
    color: "#292D39",
    textAlign: "center",
  },

  tabTitleSelected: {
    color: "#C81737",
  },

  tabSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#858995",
    marginTop: 2,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#ECEEF2",
    paddingHorizontal: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#FDECEF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
    color: "#171B29",
    textAlign: "center",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 18,
    lineHeight: 26,
    color: "#777C89",
    textAlign: "center",
  },

  primaryButton: {
    height: 77,
    width: "100%",
    backgroundColor: "#D5092F",
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonPressed: {
    opacity: 0.85,
  },

  primaryButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
