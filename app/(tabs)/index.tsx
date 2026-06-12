import Container from "@/components/common/Container";
import { Image, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import tw from "twrnc";

import logo from "@/assets/images/logo.png";
import SearchBar from "@/components/SearchBar";
import Navoptions from "@/components/Navoptions";
import Suggestions from "@/components/Suggestions";

export default function HomeScreen() {
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image source={logo} style={tw`w-45 h-15`} />
          <SearchBar />
          <Navoptions />
          <Suggestions />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}