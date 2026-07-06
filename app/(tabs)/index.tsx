import Container from "@/components/common/Container";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

import GetCurrentLocation from "@/components/GetCurrentLocation";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import Navoptions from "@/components/Navoptions";
import RecentVisitedPlaces from "@/components/RecentVisitedPlaces";
import PromoCarousel from "@/components/PromoCarousel";
import MiniMapPreview from "@/components/MiniMapPreview";
import FavoritePlaces from "@/components/FavoritePlaces";

export default function HomeScreen() {
  const colors = useThemeColors();
  return (
    <ScrollView>
      <Container
        style={[tw`flex-1 px-3 `, { backgroundColor: colors.background }]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={tw`flex-row justify-between items-center px-1`}>
              <Logo />
              <GetCurrentLocation />
            </View>
            <SearchBar />
              <Navoptions />
              <RecentVisitedPlaces />
              <FavoritePlaces/>
              <PromoCarousel />
              <MiniMapPreview />
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </ScrollView>
  );
}
