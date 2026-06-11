import Container from "@/components/common/Container";
import { Image } from "react-native";
import tw from "twrnc";

import logo from "@/assets/images/logo.png";
import SearchBar from "@/components/SearchBar";

export default function HomeScreen() {
  return (
    <Container>
      <Image source={logo} style={tw`w-45 h-15`} />
      <SearchBar/>
    </Container>
  );
}