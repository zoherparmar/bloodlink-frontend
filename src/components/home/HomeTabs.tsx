import { setUser } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Mode = "seeker" | "donor";

const MODES = [
  { key: "seeker", label: "Find blood", icon: "magnify" },
  { key: "donor", label: "Donate blood", icon: "hand-heart" },
] as const;

export default function HomeTabs() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const mode: Mode = user?.role === "donor" ? "donor" : "seeker";

  const changeMode = (next: Mode) => {
    if (user && next !== mode) {
      dispatch(setUser({ ...user, role: next }));
      router.navigate("/(tabs)/home");
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        {MODES.map((m) => {
          const isActive = mode === m.key;
          return (
            <Pressable
              key={m.key}
              style={styles.tab}
              onPress={() => changeMode(m.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <View style={styles.tabContent}>
                <MaterialCommunityIcons
                  name={m.icon}
                  size={22}
                  color={isActive ? "#D5092F" : "#8C92A3"}
                />
                <Text style={[styles.label, isActive && styles.labelActive]}>
                  {m.label}
                </Text>
              </View>
              <View
                style={[styles.underline, isActive && styles.underlineActive]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF2",
  },
  row: { flexDirection: "row" },
  tab: { flex: 1, alignItems: "center" },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 12,
    paddingBottom: 10,
  },
  label: { fontSize: 17, fontWeight: "700", color: "#8C92A3" },
  labelActive: { color: "#D5092F" },
  underline: { height: 3, width: "100%", backgroundColor: "transparent" },
  underlineActive: { backgroundColor: "#D5092F" },
});
