import { getCurrentUser } from "@/services/auth";
import { initializAuth, setUser } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
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
      const user = await getCurrentUser();

      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(initializAuth());
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      router.replace("/(auth)/login");
    }
  }, [initialized, user, router]);

  if (!initialized) return null;

  return <> {children} </>;
}
