import Container from "@/components/common/Container";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

import SearchBar from "@/components/SearchBar";
import Navoptions from "@/components/Navoptions";
import Logo from "@/components/Logo";
import GetCurrentLocation from "@/components/GetCurrentLocation";
import tw from "twrnc";
import { useThemeColors } from "@/hooks/use-theme-colors";
import RecentVisitedPlaces from "@/components/RecentVisitedPlaces";
import PromoCarousel from "@/components/PromoCarousel";

export default function HomeScreen() {
  const colors = useThemeColors();
  return (
    <Container style={[tw`flex-1 px-3 `, { backgroundColor: colors.background }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={tw`flex-row justify-between items-center px-1`}>
            <Logo />
            <GetCurrentLocation />
          </View>

          <SearchBar />
          <Navoptions />
          <RecentVisitedPlaces/>
          <PromoCarousel/>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}