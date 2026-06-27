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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(null);
  
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
      <SafeAreaView style={tw`flex-1 bg-white/90`} edges={["top"]}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={tw`flex-1`}
        >
          <View style={tw`flex-1 px-6 justify-center max-w-md mx-auto w-full`}>
            
            <View style={tw`items-center mb-12`}>
              <Logo />
              <Text style={tw`text-gray-400 text-sm font-medium tracking-widest uppercase mt-3`}>
                Move smarter.
              </Text>
            </View>
            
            <View style={tw`mb-10`}>
              <Text style={tw`text-black text-4xl font-extrabold tracking-tighter mb-1.5`}>
                Let&apos;s get moving.
              </Text>
              <Text style={tw`text-gray-500 text-base font-normal tracking-wide`}>
                Sign in to your account to continue.
              </Text>
            </View>

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
                          : "border-gray-100"
                    )}
                  >
                    <Ionicons 
                      name="mail-outline" 
                      size={20} 
                      color={errors.email ? "#ef4444" : focusedInput === "email" ? "#000000" : "#9ca3af"} 
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
                <View style={tw`mb-6`}>
                  <View
                    style={tw.style(
                      `bg-gray-50 border shadow-sm rounded-2xl px-5 h-14 flex-row items-center`,
                      errors.password 
                        ? "border-red-500" 
                        : focusedInput === "password" 
                          ? "border-black" 
                          : "border-gray-100"
                    )}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={errors.password ? "#ef4444" : focusedInput === "password" ? "#000000" : "#9ca3af"}
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
            <TouchableOpacity
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.8}
              style={tw.style(
                "rounded-2xl h-14 items-center justify-center mb-8 shadow-sm",
                isSubmitting ? "bg-gray-500" : "bg-black"
              )}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={tw`text-white text-lg font-bold`}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={tw`flex-row items-center mb-8`}>
              <View style={tw`flex-1 h-px bg-gray-300`} />
              <Text style={tw`text-gray-500 mx-4 text-xs tracking-wider font-semibold`}>OR CONTINUE WITH</Text>
              <View style={tw`flex-1 h-px bg-gray-300`} />
            </View>

            <View style={tw`flex-row justify-center mb-10`}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`w-full h-14 rounded-2xl bg-gray-100 border border-gray-200 items-center justify-center flex-row gap-3`}
              >
                <Ionicons name="logo-google" size={22} color="black" />
                <Text style={tw`text-black font-semibold text-base`}>Google</Text>
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row justify-center items-center`}>
              <Text style={tw`text-gray-500`}>Don&apos;t have an account?</Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text style={tw`text-black font-semibold ml-2`}>
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