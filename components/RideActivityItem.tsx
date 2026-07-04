import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { createThemeStyles } from "@/constants/theme";

export default function RideActivityItem({ item }: { item: any }) {
  const review = item.ride_reviews?.[0];

  const colors = useThemeColors();
  const theme = createThemeStyles(colors);

  return (
    <View
      style={[
        tw`rounded-3xl p-5 mb-4 border shadow-sm`,
        theme.card,
      ]}
    >
      <View style={tw`flex-row justify-between items-start mb-5`}>
        <View style={tw`flex-1 mr-2`}>
          <View style={tw`flex-row items-baseline flex-wrap`}>
            <Text
              style={[
                tw`text-base font-bold tracking-tight mr-2`,
                theme.text,
              ]}
            >
              {item.cars?.title || "Standard Ride"}
            </Text>

            <Text
              numberOfLines={1}
              style={[
                tw`text-xs font-medium`,
                theme.mutedText,
              ]}
            >
              • {item.drivers?.car_model || "—"}
            </Text>
          </View>

          <Text
            style={[
              tw`text-xs font-medium mt-0.5`,
              theme.mutedText,
            ]}
          >
            {new Date(item.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>

        <View
          style={tw.style(
            "px-3 py-1 rounded-full border",
            item.status === "trip_ended"
              ? "bg-green-50 border-green-100"
              : item.status === "trip_started"
              ? "bg-blue-50 border-blue-100"
              : "bg-amber-50 border-amber-100"
          )}
        >
          <Text
            style={tw.style(
              "text-[10px] font-bold tracking-wider",
              item.status === "trip_ended"
                ? "text-green-700"
                : item.status === "trip_started"
                ? "text-blue-700"
                : "text-amber-700"
            )}
          >
            {item.status?.replace("_", " ").toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={tw`flex-row h-16 mb-5`}>
        <View style={tw`items-center justify-between mr-3.5 py-1`}>
          <View style={tw`w-2.5 h-2.5 rounded-full bg-emerald-500`} />

          <View
            style={[
              tw`w-[1.5px] flex-1 my-1`,
              theme.divider,
            ]}
          />

          <View style={tw`w-2.5 h-2.5 rounded-full bg-rose-500`} />
        </View>

        <View style={tw`flex-1 justify-between py-0.5`}>
          <Text
            numberOfLines={1}
            style={[
              tw`text-sm font-medium tracking-tight`,
              theme.text,
            ]}
          >
            {item.origin}
          </Text>

          <Text
            numberOfLines={1}
            style={[
              tw`text-sm font-medium tracking-tight`,
              theme.secondaryText,
            ]}
          >
            {item.destination}
          </Text>
        </View>
      </View>

      <View
        style={[
          tw`flex-row items-center justify-between border-t pt-4`,
          theme.border,
        ]}
      >
        <View style={tw`flex-row items-center flex-1 mr-2`}>
          <View
            style={[
              tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
              theme.avatar,
            ]}
          >
            <Text
              style={[
                tw`font-bold text-sm`,
                theme.secondaryText,
              ]}
            >
              {item.drivers?.name?.charAt(0).toUpperCase() || "D"}
            </Text>
          </View>

          <View style={tw`flex-1`}>
            <Text
              numberOfLines={1}
              style={[
                tw`text-sm font-semibold`,
                theme.text,
              ]}
            >
              {item.drivers?.name}
            </Text>

            <View style={tw`flex-row items-center mt-0.5`}>
              <Text style={tw`text-amber-500 text-xs`}>★</Text>

              <Text
                style={[
                  tw`text-xs font-semibold ml-1`,
                  theme.secondaryText,
                ]}
              >
                {item.drivers?.rating?.toFixed(1) || "0.0"}
              </Text>

              {review && (
                <View
                  style={[
                    tw`flex-row items-center ml-3 px-2 py-0.5 rounded-md border`,
                    theme.surface,
                    theme.border,
                  ]}
                >
                  <Text
                    style={[
                      tw`text-[10px] font-medium mr-1`,
                      theme.mutedText,
                    ]}
                  >
                    You:
                  </Text>

                  <Text style={tw`text-amber-500 text-[10px]`}>
                    ★
                  </Text>

                  <Text
                    style={[
                      tw`text-[10px] font-bold ml-0.5`,
                      theme.text,
                    ]}
                  >
                  {review.rating}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={tw`items-end`}>
          <Text
            style={[
              tw`text-[10px] font-bold uppercase tracking-wider`,
              theme.mutedText,
            ]}
          >
            Fare
          </Text>

          <Text
            style={[
              tw`text-lg font-black mt-0.5`,
              theme.text,
            ]}
          >
            EGP {item.price}
          </Text>
        </View>
      </View>

      {review?.comment && (
        <View
          style={[
            tw`mt-3 rounded-xl p-3 border`,
            theme.surface,
            theme.border,
          ]}
        >
          <Text
            style={[
              tw`text-xs italic leading-4`,
              theme.secondaryText,
            ]}
          >
            You: {review.comment}
          </Text>
        </View>
      )}
    </View>
  );
}