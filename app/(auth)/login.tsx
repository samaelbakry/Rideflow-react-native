import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import Logo from "@/components/Logo";
import { loginSchema, LoginSchemaType } from "@/schemas/auth-schemas";
import { login } from "@/services/auth";
import { setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { Link, useRouter } from "expo-router";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";
import { useNetworkStatus } from "@/hooks/use-network-status";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(
    null,
  );
  const colors = useThemeColors();
  const theme = createThemeStyles(colors);
  const isConnected = useNetworkStatus();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    if (!isConnected) {
      Alert.alert("No Internet", "Please check your connection.");
      return;
    }
    try {
      const user = await login(values);
      dispatch(setUser(user));
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Something went wrong.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[tw`flex-1`, theme.container]} edges={["top"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex-1`}
        >
          <View style={tw`flex-1 px-6 justify-center max-w-md mx-auto w-full`}>
            <View style={tw`items-center mb-12`}>
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

            <View style={tw`mb-10`}>
              <Text
                style={[
                  tw`text-4xl font-extrabold tracking-tighter mb-1.5`,
                  theme.text,
                ]}
              >
                Let&apos;s get moving.
              </Text>

              <Text style={[tw`text-base tracking-wide`, theme.secondaryText]}>
                Sign in to your account to continue.
              </Text>
            </View>

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
                <View style={tw`mb-6`}>
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
                <Text style={[tw`font-semibold text-base text-xl`, theme.text]}>
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <View style={tw`flex-row justify-center items-center`}>
              <Text style={theme.secondaryText}>
                Don&apos;t have an account?
              </Text>

              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text
                    style={[tw`font-semibold ml-2`, { color: colors.primary }]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
