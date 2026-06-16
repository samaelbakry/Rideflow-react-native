import { useEffect } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import Logo from "./Logo";

export default function AnimatedSplash({
  onFinish,
}: {
  onFinish: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animatable.Text
        animation="fadeInUp"
        duration={1200}
        style={{
          fontSize: 42,
          fontWeight: "900",
          color: "#000",
          letterSpacing: 4,
        }}
      >
        <Logo />
      </Animatable.Text>

      <Animatable.View
        animation="fadeIn"
        delay={600}
        duration={800}
        style={{
          width: 110,
          height: 4,
          backgroundColor: "#000",
          borderRadius: 10,
          marginTop: 14,
        }}
      />
    </View>
  );
}