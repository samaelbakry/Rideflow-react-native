import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { selectIsDarkMode, toggleTheme } from "@/store/slices/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export default function Appearance() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const themeOptions = [
    { label: "Light", value: "light", icon: "sunny-outline" as const },
    { label: "Dark", value: "dark", icon: "moon-outline" as const },
  ];

  const currentTheme = isDarkMode ? "dark" : "light";

  const handleThemeChange = (value: "light" | "dark") => {
    dispatch(toggleTheme(value === "dark"));
  };

  return (
    <View style={tw`flex-row items-center justify-between w-full`}>
      <View style={tw`flex-1 mr-4`}>
        <View style={tw`flex-row items-center mb-0.5`}>
          <Ionicons 
            name={isDarkMode ? "moon-outline" : "sunny-outline"} 
            size={18} 
            color="#18181b" 
          />
          <Text style={tw`font-semibold text-base text-zinc-900 ml-2`}>
             Theme
          </Text>
        </View>
        
      </View>

      <View style={tw`flex-row bg-zinc-100 p-1 rounded-2xl border border-zinc-200/40`}>
        {themeOptions.map((option) => {
          const isActive = currentTheme === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              activeOpacity={0.8}
              onPress={() => handleThemeChange(option.value as "light" | "dark")}
              style={tw`flex-row items-center px-4 py-2 rounded-xl ${
                isActive ? "bg-white shadow-sm" : ""
              }`}
            >
              <Ionicons
                name={option.icon}
                size={15}
                color={isActive ? "#18181b" : "#71717a"}
              />
              <Text
                style={tw`text-sm font-medium ml-1.5 ${
                  isActive ? "text-zinc-900 font-bold" : "text-zinc-500"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}