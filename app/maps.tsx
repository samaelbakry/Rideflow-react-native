import MapContent from "@/components/MapContent";
import NavigateCard from "@/components/NavigateCard";
import { createThemeStyles } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { goBackRideState, rideState, selectDestination, setOrigin } from "@/store/slices/rideFlowSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function Maps() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "50%", "90%"], []);

  const rideStatus = useAppSelector(rideState);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  const destination = useAppSelector(selectDestination)

  const goBack = ()=>{
    dispatch(
      setOrigin(null),
    )
    
    router.replace("/")
  }

  return (
    <View style={tw`flex-1`}>
      <MapContent />

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backgroundStyle={theme.card}
        handleIndicatorStyle={theme.divider}
      >
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          style={[tw`flex-1`, theme.container]}
          contentContainerStyle={tw`pb-6`}
        >
          {rideStatus !== "idle" && (
            <TouchableOpacity
              onPress={() => dispatch(goBackRideState())}
              style={[
                tw`absolute top-1 left-6 rounded-full p-2 shadow-md z-50`,
                theme.card,
              ]}
            >
              <Ionicons name="arrow-back" size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
          <View style={tw`mt-3 relative`}>
           {
            !destination && <TouchableOpacity
              style={tw`absolute right-4 -top-3`}
              onPress={goBack}
            >
              <Ionicons name="close-circle" size={26} color={colors.icon} />
            </TouchableOpacity>
           }
            <NavigateCard />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
