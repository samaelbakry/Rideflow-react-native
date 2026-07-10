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
import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useNetworkStatus } from "@/hooks/use-network-status";

type FieldNames = "fullName" | "email" | "password" | "confirmPassword";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<FieldNames | null>(null);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);
  const isConnected = useNetworkStatus();


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
      if (!isConnected) {
        Alert.alert("No Internet", "Please check your connection.");
        return;
      }
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
      <SafeAreaView style={[tw`flex-1`, theme.container]} edges={["top"]}>
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
                style={[
                  tw`text-sm font-medium tracking-widest uppercase mt-3`,
                  theme.mutedText,
                ]}
              >
                Move smarter.
              </Text>
            </View>

            <View style={tw`mb-8`}>
              <Text
                style={[
                  tw`text-4xl font-extrabold tracking-tighter mb-1.5`,
                  theme.text,
                ]}
              >
                Create Account
              </Text>
              <Text
                style={[
                  tw`text-base font-normal tracking-wide`,
                  theme.secondaryText,
                ]}
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
                    style={[
                      tw`border rounded-2xl px-5 h-14 flex-row items-center`,
                      theme.input,
                      errors.fullName
                        ? { borderColor: colors.danger }
                        : focusedInput === "fullName"
                          ? { borderColor: colors.primary }
                          : null,
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={
                        errors.fullName
                          ? colors.danger
                          : focusedInput === "fullName"
                            ? colors.primary
                            : colors.icon
                      }
                    />
                    <TextInput
                      placeholder="Full Name"
                      placeholderTextColor={colors.textMuted}
                      autoCorrect={false}
                      style={[tw`flex-1 ml-3 text-base h-full`, theme.text]}
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedInput("fullName")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  {errors.fullName && (
                    <Text
                      style={[tw`text-xs mt-2 ml-1`, { color: colors.danger }]}
                    >
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
                    style={[
                      tw`border rounded-2xl px-5 h-14 flex-row items-center`,
                      theme.input,
                      errors.email
                        ? { borderColor: colors.danger }
                        : focusedInput === "email"
                          ? { borderColor: colors.primary }
                          : null,
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={
                        errors.email
                          ? colors.danger
                          : focusedInput === "email"
                            ? colors.primary
                            : colors.icon
                      }
                    />
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={[tw`flex-1 ml-3 text-base h-full`, theme.text]}
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  {errors.email && (
                    <Text
                      style={[tw`text-xs mt-2 ml-1`, { color: colors.danger }]}
                    >
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
                    style={[
                      tw`border rounded-2xl px-5 h-14 flex-row items-center`,
                      theme.input,
                      errors.password
                        ? { borderColor: colors.danger }
                        : focusedInput === "password"
                          ? { borderColor: colors.primary }
                          : null,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={
                        errors.password
                          ? colors.danger
                          : focusedInput === "password"
                            ? colors.primary
                            : colors.icon
                      }
                    />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={colors.textMuted}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={[tw`flex-1 ml-3 text-base h-full`, theme.text]}
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
                        color={colors.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text
                      style={[tw`text-xs mt-2 ml-1`, { color: colors.danger }]}
                    >
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
                    style={[
                      tw`border rounded-2xl px-5 h-14 flex-row items-center`,
                      theme.input,
                      errors.confirmPassword
                        ? { borderColor: colors.danger }
                        : focusedInput === "confirmPassword"
                          ? { borderColor: colors.primary }
                          : null,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={
                        errors.confirmPassword
                          ? colors.danger
                          : focusedInput === "confirmPassword"
                            ? colors.primary
                            : colors.icon
                      }
                    />
                    <TextInput
                      placeholder="Confirm Password"
                      placeholderTextColor={colors.textMuted}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={[tw`flex-1 ml-3 text-base h-full`, theme.text]}
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
                        color={colors.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && (
                    <Text
                      style={[tw`text-xs mt-2 ml-1`, { color: colors.danger }]}
                    >
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.4}
              style={[
                tw`rounded-2xl h-14 items-center justify-center mb-8 shadow-md`,
                isSubmitting
                  ? { backgroundColor: colors.textMuted }
                  : theme.card,
              ]}
            >
              {isSubmitting ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <Text style={[tw`font-semibold text-xl`, theme.text]}>
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            <View style={tw`flex-row justify-center items-center`}>
              <Text style={theme.secondaryText}>Already have an account?</Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text
                    style={[tw`font-semibold ml-2`, { color: colors.primary }]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
