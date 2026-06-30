import MapContent from "@/components/MapContent";
import NavigateCard from "@/components/NavigateCard";
import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import tw from "twrnc";

import BottomSheet, {
  BottomSheetScrollView
} from "@gorhom/bottom-sheet";

export default function Maps() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  return (
    <View style={tw`flex-1`}>
      <MapContent />
      <BottomSheet
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enablePanDownToClose
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        android_keyboardInputMode="adjustResize"
      >
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          style={tw`flex-1`}
        >
          <NavigateCard />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
