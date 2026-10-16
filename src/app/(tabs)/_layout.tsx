import HomeTabs from "@/components/home/HomeTabs";
import { useAppSelector } from "@/store/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const role = useAppSelector((state) => state.auth.user?.role);
  const isDonor = role === "donor";

  return (
    <Tabs
      screenOptions={{
        header: () => <HomeTabs />,
        tabBarStyle: isDonor ? { display: "none" } : undefined,
        tabBarActiveTintColor: "#D5092F",
        tabBarInactiveTintColor: "#8C92A3",
        tabBarLabelStyle: { fontSize: 13, fontWeight: "700" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-grid"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
