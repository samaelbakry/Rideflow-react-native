import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          backgroundColor: "#FFF",
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
  name="index"
  options={{
    title: "Home",
    tabBarIcon: ({ color, focused }) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={24}
        color={color}
      />
    ),
  }}
/>

<Tabs.Screen
  name="activity"
  options={{
    title: "Activity",
    tabBarIcon: ({ color, focused }) => (
      <Ionicons
        name={focused ? "time" : "time-outline"}
        size={24}
        color={color}
      />
    ),
  }}
/>

<Tabs.Screen
  name="services"
  options={{
    title: "Services",
    tabBarIcon: ({ color, focused }) => (
      <Ionicons
        name={focused ? "grid" : "grid-outline"}
        size={24}
        color={color}
      />
    ),
  }}
/>

<Tabs.Screen
  name="account"
  options={{
    title: "Account",
    tabBarIcon: ({ color, focused }) => (
      <Ionicons
        name={focused ? "person" : "person-outline"}
        size={24}
        color={color}
      />
    ),
  }}
/>
    </Tabs>
  );
}
