import Container from "@/components/common/Container";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";


import SearchBar from "@/components/SearchBar";
import Navoptions from "@/components/Navoptions";
import Suggestions from "@/components/Suggestions";
import Logo from "@/components/Logo";
import tw from "twrnc"
import GetCurrentLocation from "@/components/GetCurrentLocation";

export default function HomeScreen() {
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={tw`flex-row justify-between items-center px-1 `}>
          <Logo/>
          <GetCurrentLocation/>
          </View>
          <SearchBar />
          <Navoptions />
          <Suggestions />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}