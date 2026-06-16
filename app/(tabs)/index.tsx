import Container from "@/components/common/Container";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";


import SearchBar from "@/components/SearchBar";
import Navoptions from "@/components/Navoptions";
import Suggestions from "@/components/Suggestions";
import Logo from "@/components/Logo";

export default function HomeScreen() {
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Logo/>
          <SearchBar />
          <Navoptions />
          <Suggestions />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}