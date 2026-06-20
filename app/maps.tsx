import MapContent from "@/components/MapContent";
import NavigateCard from "@/components/NavigateCard";
import React, { useMemo, useRef } from "react";
import { Keyboard, View } from "react-native";
import tw from "twrnc";

import BottomSheet, {
  BottomSheetView,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";

export default function Maps() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  return (
    <View style={tw`flex-1`}>
      <MapContent />

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetView style={tw`flex-1`}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <NavigateCard />
          </TouchableWithoutFeedback>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
