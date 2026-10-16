import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DonorOverview from "./DonorOverview";
import DonorRequests from "./DonorRequests";

type Section = "home" | "requests";

const SECTIONS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "requests", label: "Requests", icon: "inbox" },
] as const;

export default function DonorHome() {
  const insets = useSafeAreaInsets();
  const [section, setSection] = useState<Section>("home");

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        {section === "home" ? <DonorOverview /> : <DonorRequests />}
      </View>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom }]}>
        {SECTIONS.map((s) => {
          const isActive = section === s.key;
          return (
            <Pressable
              key={s.key}
              style={styles.bottomTab}
              onPress={() => setSection(s.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <MaterialCommunityIcons
                name={s.icon}
                size={26}
                color={isActive ? "#D5092F" : "#8C92A3"}
              />
              <Text
                style={[
                  styles.bottomLabel,
                  isActive && styles.bottomLabelActive,
                ]}
              >
                {s.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F4F5F8" },
  content: { flex: 1 },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ECEEF2",
  },
  bottomTab: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 6,
    gap: 2,
  },
  bottomLabel: { fontSize: 13, fontWeight: "700", color: "#8C92A3" },
  bottomLabelActive: { color: "#D5092F" },
});
