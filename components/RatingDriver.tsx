import { createRideReview } from "@/services/rideReview";
import { selectedDriver, selectedRideId } from "@/store/slices/rideFlowSlice";
import { useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function RatingDriver() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  const ride_id = useAppSelector(selectedRideId);
  const driver = useAppSelector(selectedDriver);
  const user_id = useAppSelector((state) => state.auth.user?.id);
  const driverId = driver?._id || driver?.id;

  const handlePress = async () => {
    if (!ride_id || !driverId || !user_id) {
      Alert.alert("Error", "Missing ride or driver details.");
      return;
    }

    if (rating === 0) {
      Alert.alert(
        "Rating Required",
        "Please select a star rating before submitting."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await createRideReview({
        ride_id,
        driver_id: driverId,
        user_id,
        rating,
        comment,
      });

      Alert.alert("Thank You!", "Your feedback helps improve the community.");

      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View
      style={[
        tw`p-6 rounded-3xl shadow-md w-full max-w-sm mx-auto border`,
        theme.card,
      ]}
    >
      <Text
        style={[
          tw`text-xl font-bold text-center tracking-tight`,
          theme.text,
        ]}
      >
        How was your ride?
      </Text>

      <Text
        style={[
          tw`text-sm text-center mt-1 mb-5`,
          theme.caption,
        ]}
      >
        Your feedback keeps our community safe and reliable.
      </Text>

      <View style={tw`flex-row justify-center mb-6`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            activeOpacity={0.7}
            style={tw`mx-1.5 p-1`}
          >
            <Ionicons
              name={rating >= star ? "star" : "star-outline"}
              size={38}
              color={rating >= star ? "#EAB308" : colors.border}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={[
          tw`rounded-2xl px-4 py-3 flex-row items-start mb-6 min-h-[60px] border`,
          theme.input,
        ]}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={20}
          color={colors.textMuted}
          style={tw`mt-0.5`}
        />

        <BottomSheetTextInput
          placeholder="Leave a comment ..."
          placeholderTextColor={colors.textMuted}
          autoCapitalize="sentences"
          autoCorrect
          multiline
          value={comment}
          onChangeText={setComment}
          style={[
            tw`flex-1 ml-3 text-base`,
            {
              color: colors.text,
            },
          ]}
        />
      </View>

      <TouchableOpacity
        onPress={handlePress}
        disabled={rating === 0 || isSubmitting}
        style={[
          tw`w-full py-4 rounded-2xl items-center justify-center`,
          {
            backgroundColor:
              rating === 0 || isSubmitting
                ? colors.surface
                : colors.primary,
          },
        ]}
      >
        <Text
          style={[
            tw`font-semibold text-base`,
            {
              color:
                rating === 0 || isSubmitting
                  ? colors.textMuted
                  : colors.onPrimary,
            },
          ]}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}