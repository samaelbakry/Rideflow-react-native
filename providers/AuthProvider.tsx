import { initializAuth, setUser } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { initialized, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await AsyncStorage.getItem("user");

        if (user) {
          dispatch(setUser(JSON.parse(user)));
        } else {
          dispatch(initializAuth());
        }
      } catch {
        dispatch(initializAuth());
      }
    };

    initialize();
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      router.replace("/(auth)/login");
    }
  }, [initialized, user, router]);

  if (!initialized) return null;

  return <> {children} </>;
}
