import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
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
import { setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter()

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

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      dispatch(setUser(data));
      await AsyncStorage.setItem("user", JSON.stringify(data));
      router.replace("/")
    } catch (error) {
      console.log("Failed to register user", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tw`flex-1 bg-white/90`} edges={["top"]}>
        <View style={tw`flex-1 px-6 justify-center`}>
          <View style={tw`items-center mb-12`}>
            <Logo />

            <Text style={tw`text-gray-500 text-base mt-2`}>Move smarter.</Text>
          </View>

          <View style={tw`mb-8`}>
            <Text style={tw`text-black text-4xl font-bold mb-2`}>
              Welcome back
            </Text>

            <Text style={tw`text-gray-500 text-sm`}>
              Sign in to continue your journey
            </Text>
          </View>

         <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  style={tw`bg-gray-50 border border-gray-100 shadow rounded-2xl px-5 h-14 flex-row items-center`}
                >
                  <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={tw`flex-1 ml-3 text-black text-base`}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>

                {errors.email && (
                  <Text style={tw`text-red-500 text-xs mt-2 ml-1`}>
                    {errors.email.message}
                  </Text>
                )}
              </>
            )}
          />


          <View style={tw`h-4`} />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  style={tw`bg-gray-50 border border-gray-100 shadow rounded-2xl px-5 h-14 flex-row items-center`}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9ca3af"
                  />

                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    style={tw`flex-1 ml-3 text-black text-base`}
                    value={value}
                    onChangeText={onChange}
                  />

                  <TouchableOpacity onPress={() => setShowPassword((p) => !p)}>
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
              </>
            )}
          />

          <TouchableOpacity
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            style={tw.style(
              "rounded-2xl h-14 items-center justify-center my-8",
              isSubmitting ? "bg-gray-500" : "bg-black",
            )}
          >
            <Text style={tw`text-white text-lg font-bold`}>
              {isSubmitting ? (
                <ActivityIndicator color={"white"} />
              ) : (
                "Login"
              )}
            </Text>
          </TouchableOpacity>

          <View style={tw`flex-row items-center mb-8`}>
            <View style={tw`flex-1 h-px bg-gray-300`} />
            <Text style={tw`text-gray-500 mx-4`}>or continue with</Text>
            <View style={tw`flex-1 h-px bg-gray-300`} />
          </View>

          <View style={tw`flex-row justify-center gap-4 mb-10`}>
            <TouchableOpacity
              style={tw`w-14 h-14 rounded-full bg-gray-100 border border-gray-200 items-center justify-center`}
            >
              <Ionicons name="logo-google" size={22} color="black" />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row justify-center`}>
            <Text style={tw`text-gray-500`}>Dont have an account?</Text>

            <Link
              href="/(auth)/register"
              style={tw`text-black font-semibold ml-2`}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
