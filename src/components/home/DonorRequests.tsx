import { StyleSheet, Text, View } from "react-native";

export default function DonorRequests() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requests</Text>
      <Text style={styles.text}>Requests from seekers will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5F8",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#10182B",
    marginBottom: 6,
  },
  text: {
    fontSize: 17,
    color: "#7A8194",
    textAlign: "center",
  },
});
