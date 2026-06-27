import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import Logo from "@/components/Logo";
import { registerSchema, RegisterSchemaType } from "@/schemas/auth-schemas";
import { register } from "@/services/auth";
import { setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";

type FieldNames = "fullName" | "email" | "password" | "confirmPassword";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<FieldNames | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    try {
      const user = await register(values);
      dispatch(setUser(user));
      router.replace("/");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.message || "Something went wrong.",
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tw`flex-1 bg-white/90`} edges={["top"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex-1`}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`flex-grow px-6 justify-center max-w-md mx-auto w-full py-8`}
          >
            <View style={tw`items-center mb-10`}>
              <Logo />
              <Text
                style={tw`text-gray-400 text-sm font-medium tracking-widest uppercase mt-3`}
              >
                Move smarter.
              </Text>
            </View>
            <View style={tw`mb-8`}>
              <Text
                style={tw`text-black text-4xl font-extrabold tracking-tighter mb-1.5`}
              >
                Create Account
              </Text>
              <Text
                style={tw`text-gray-500 text-base font-normal tracking-wide`}
              >
                Join RideFlow and start your journey.
              </Text>
            </View>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <View style={tw`mb-4`}>
                  <View
                    style={tw.style(
                      `bg-gray-50 border shadow-sm rounded-2xl px-5 h-14 flex-row items-center`,
                      errors.fullName
                        ? "border-red-500"
                        : focusedInput === "fullName"
                          ? "border-black"
                          : "border-gray-100",
                    )}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={
                        errors.fullName
                          ? "#ef4444"
                          : focusedInput === "fullName"
                            ? "#000000"
                            : "#9ca3af"
                      }
                    />
                    <TextInput
                      placeholder="Full Name"
                      placeholderTextColor="#9ca3af"
                      autoCorrect={false}
                      style={tw`flex-1 ml-3 text-black text-base h-full`}
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedInput("fullName")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  {errors.fullName && (
                    <Text style={tw`text-red-500 text-xs mt-2 ml-1`}>
                      {errors.fullName.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View style={tw`mb-4`}>
                  <View
                    style={tw.style(
                      `bg-gray-50 border shadow-sm rounded-2xl px-5 h-14 flex-row items-center`,
                      errors.email
                        ? "border-red-500"
                        : focusedInput === "email"
                          ? "border-black"
                          : "border-gray-100",
                    )}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={
                        errors.email
                          ? "#ef4444"
                          : focusedInput === "email"
                            ? "#000000"
                            : "#9ca3af"
                      }
                    />
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="#9ca3af"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={tw`flex-1 ml-3 text-black text-base h-full`}
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  {errors.email && (
                    <Text style={tw`text-red-500 text-xs mt-2 ml-1`}>
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View style={tw`mb-4`}>
                  <View
                    style={tw.style(
                      `bg-gray-50 border shadow-sm rounded-2xl px-5 h-14 flex-row items-center`,
                      errors.password
                        ? "border-red-500"
                        : focusedInput === "password"
                          ? "border-black"
                          : "border-gray-100",
                    )}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={
                        errors.password
                          ? "#ef4444"
                          : focusedInput === "password"
                            ? "#000000"
                            : "#9ca3af"
                      }
                    />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#9ca3af"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={tw`flex-1 ml-3 text-black text-base h-full`}
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedInput("password")}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((p) => !p)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={tw`text-red-500 text-xs mt-2 ml-1`}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <View style={tw`mb-6`}>
                  <View
                    style={tw.style(
                      `bg-gray-50 border shadow-sm rounded-2xl px-5 h-14 flex-row items-center`,
                      errors.confirmPassword
                        ? "border-red-500"
                        : focusedInput === "confirmPassword"
                          ? "border-black"
                          : "border-gray-100",
                    )}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={
                        errors.confirmPassword
                          ? "#ef4444"
                          : focusedInput === "confirmPassword"
                            ? "#000000"
                            : "#9ca3af"
                      }
                    />
                    <TextInput
                      placeholder="Confirm Password"
                      placeholderTextColor="#9ca3af"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={tw`flex-1 ml-3 text-black text-base h-full`}
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedInput("confirmPassword")}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword((p) => !p)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={22}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && (
                    <Text style={tw`text-red-500 text-xs mt-2 ml-1`}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.8}
              style={tw.style(
                "rounded-2xl h-14 items-center justify-center mb-8 shadow-sm",
                isSubmitting ? "bg-gray-500" : "bg-black",
              )}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={tw`text-white text-lg font-bold`}>
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            <View style={tw`flex-row justify-center items-center`}>
              <Text style={tw`text-gray-500`}>Already have an account?</Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={tw`text-black font-semibold ml-2`}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
