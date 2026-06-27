import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    Alert.alert(error.message);
  }
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tw`flex-1 bg-white/90`} edges={["top"]}>
        <ScrollView contentContainerStyle={tw`flex-1 px-6 justify-center`}>
          <View style={tw`items-center mb-12`}>
            <Logo />
            <Text style={tw`text-gray-500 text-base mt-2`}>Move smarter.</Text>
          </View>

          <View style={tw`mb-8`}>
            <Text style={tw`text-black text-4xl font-bold mb-2`}>
              Create Account
            </Text>

            <Text style={tw`text-gray-500 text-sm`}>
              Join RideFlow and start your journey
            </Text>
          </View>

          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  style={tw`bg-gray-50 border border-gray-200 rounded-2xl px-5 h-14 flex-row items-center`}
                >
                  <Ionicons name="person-outline" size={20} color="#9ca3af" />
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#9ca3af"
                    style={tw`flex-1 ml-3 text-black text-base`}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>

                {errors.fullName && (
                  <Text style={tw`text-red-500 text-xs mt-2 ml-1`}>
                    {errors.fullName.message}
                  </Text>
                )}
              </>
            )}
          />

          <View style={tw`h-4`} />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  style={tw`bg-gray-50 border border-gray-200 rounded-2xl px-5 h-14 flex-row items-center`}
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
                  style={tw`bg-gray-50 border border-gray-200 rounded-2xl px-5 h-14 flex-row items-center`}
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

          <View style={tw`h-4`} />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  style={tw`bg-gray-50 border border-gray-200 rounded-2xl px-5 h-14 flex-row items-center`}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9ca3af"
                  />

                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showConfirmPassword}
                    style={tw`flex-1 ml-3 text-black text-base`}
                    value={value}
                    onChangeText={onChange}
                  />

                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword((p) => !p)}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
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
                "Create Account"
              )}
            </Text>
          </TouchableOpacity>

          <View style={tw`flex-row justify-center`}>
            <Text style={tw`text-gray-500`}>Already have an account?</Text>

            <Link
              href="/(auth)/login"
              style={tw`text-black font-semibold ml-2`}
            >
              Sign In
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
