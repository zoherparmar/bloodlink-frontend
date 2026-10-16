import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DonorOverview() {
  const user = useAppSelector((state) => state.auth.user);
  const [isAvailable, setIsAvailable] = useState(true);

  const firstName = user?.name?.split(" ")[0] ?? "there";
  const bloodGroup = user?.bloodGroup ?? "--";
  const city = user?.city ?? "Add your city";

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Hi {firstName}</Text>
        <Text style={styles.heading}>Ready to help?</Text>

        {/* Availability */}
        <View style={[styles.card, styles.availabilityCard]}>
          <View style={styles.availabilityText}>
            <Text style={styles.cardTitle}>I can donate</Text>
            <Text style={styles.cardSubtitle}>
              Turn off when you are unavailable
            </Text>
          </View>

          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: "#D9DCE3", true: "#1FAA6E" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.statNumberRed]}>0</Text>
            <Text style={styles.statLabel}>Pending requests</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
        </View>

        {/* Profile */}
        <View style={[styles.card, styles.profileCard]}>
          <View style={styles.bloodCircle}>
            <Text style={styles.bloodCircleText}>{bloodGroup}</Text>
          </View>

          <View style={styles.profileText}>
            <Text style={styles.cardTitle}>Your profile</Text>
            <Text style={styles.cardSubtitle}>{city}</Text>
          </View>

          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
        </View>

        {/* Latest request */}
        <Text style={styles.sectionTitle}>Latest request</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rohan Sharma</Text>
          <Text style={styles.cardSubtitle}>Urgently required for surgery</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F5F8",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },

  greeting: {
    fontSize: 16,
    color: "#596174",
    marginBottom: 3,
  },

  heading: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "800",
    color: "#10182B",
    letterSpacing: -1,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 18,
    marginBottom: 14,
    shadowColor: "#10182B",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#10182B",
  },

  cardSubtitle: {
    fontSize: 16,
    color: "#7A8194",
    marginTop: 2,
  },

  availabilityCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  availabilityText: {
    flex: 1,
    paddingRight: 12,
  },

  statsRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 20,
    shadowColor: "#10182B",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  statNumber: {
    fontSize: 34,
    fontWeight: "800",
    color: "#10182B",
  },

  statNumberRed: {
    color: "#D5092F",
  },

  statLabel: {
    fontSize: 16,
    color: "#7A8194",
    marginTop: 2,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
  },

  bloodCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FDECEF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  bloodCircleText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#D5092F",
  },

  profileText: {
    flex: 1,
  },

  editButton: {
    backgroundColor: "#E6E8EE",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  editButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3A4154",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#10182B",
    marginTop: 14,
    marginBottom: 12,
  },
});
