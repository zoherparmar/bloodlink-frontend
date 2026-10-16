import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SeekerHome() {
  const user = useAppSelector((state) => state.auth.user);
  const [selectedGroup, setSelectedGroup] = useState("O+");
  const [city, setCity] = useState("Jaipur");

  const handleSearch = () => {
    if (!city.trim()) {
      Alert.alert("City required", "Please enter your city.");
      return;
    }

    // Connect the donor search API here.
    Alert.alert(
      "Search donors",
      `Blood group: ${selectedGroup}\nCity: ${city.trim()}`,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5F8" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          Hi {user?.name?.split(" ")[0] ?? "there"}
        </Text>

        <Text style={styles.heading}>Who needs blood?</Text>

        <Text style={styles.sectionTitle}>Blood group</Text>

        <View style={styles.bloodGrid}>
          {BLOOD_GROUPS.map((group) => {
            const isSelected = selectedGroup === group;

            return (
              <Pressable
                key={group}
                onPress={() => setSelectedGroup(group)}
                style={[
                  styles.bloodButton,
                  isSelected && styles.selectedBloodButton,
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  style={[
                    styles.bloodText,
                    isSelected && styles.selectedBloodText,
                  ]}
                >
                  {group}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>City</Text>

        <TextInput
          style={styles.cityInput}
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
          placeholderTextColor="#A0A5B1"
          autoCapitalize="words"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          accessibilityLabel="City"
        />

        <Pressable
          onPress={handleSearch}
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.buttonPressed,
          ]}
          accessibilityRole="button"
        >
          <Text style={styles.searchButtonText}>Search donors</Text>
        </Pressable>

        <View style={styles.infoCard}>
          <Text style={styles.dropIcon}>♥</Text>

          <Text style={styles.infoText}>
            Request goes straight to the donor. You see their reply under My
            requests.
          </Text>
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

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },

  greeting: {
    fontSize: 16,
    color: "#596174",
    fontWeight: "400",
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

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#18233A",
    marginBottom: 7,
  },

  bloodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
    marginBottom: 18,
  },

  bloodButton: {
    width: "23.5%",
    height: 63,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#DCE0E9",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedBloodButton: {
    backgroundColor: "#EF0030",
    borderColor: "#EF0030",
  },

  bloodText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#18233A",
  },

  selectedBloodText: {
    color: "#FFFFFF",
  },

  cityInput: {
    height: 60,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#DCE0E9",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#18233A",
    marginBottom: 23,
  },

  searchButton: {
    height: 66,
    backgroundColor: "#EF0030",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  infoCard: {
    minHeight: 83,
    borderRadius: 22,
    backgroundColor: "#FFE9ED",
    paddingHorizontal: 19,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },

  dropIcon: {
    fontSize: 29,
    color: "#EF0030",
    fontWeight: "800",
  },

  infoText: {
    flex: 1,
    color: "#B31C32",
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "400",
  },
});
