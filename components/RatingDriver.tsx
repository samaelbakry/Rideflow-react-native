import { createRideReview } from "@/services/rideReview";
import { selectedDriver, selectedRideId } from "@/store/slices/rideFlowSlice";
import { useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function RatingDriver() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        "Please select a star rating before submitting.",
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
      style={tw`p-6 bg-white rounded-3xl shadow-md w-full max-w-sm mx-auto`}
    >
      <Text
        style={tw`text-xl font-bold text-gray-900 text-center tracking-tight`}
      >
        How was your ride?
      </Text>
      <Text style={tw`text-sm text-gray-500 text-center mt-1 mb-5`}>
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
              color={rating >= star ? "#eab308" : "#d1d5db"}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={tw`bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 flex-row items-start mb-6 min-h-[100px]`}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={20}
          color="#9ca3af"
          style={tw`mt-0.5`}
        />

        <BottomSheetTextInput
          placeholder="Leave a comment about your experience (optional)..."
          placeholderTextColor="#a1a1aa"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          textAlignVertical="top"
          value={comment}
          onChangeText={setComment}
          style={tw`flex-1 ml-3 text-gray-800 text-base`}
        />
      </View>

      <TouchableOpacity
        onPress={handlePress}
        disabled={rating === 0 || isSubmitting}
        style={tw`w-full py-4 rounded-2xl items-center justify-center shadow-sm 
          ${rating === 0 || isSubmitting ? "bg-gray-100" : "bg-black active:opacity-90"}`}
      >
        <Text
          style={tw`font-semibold text-base 
            ${rating === 0 || isSubmitting ? "text-gray-400" : "text-white"}`}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
