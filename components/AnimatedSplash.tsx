import { useEffect } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import Logo from "./Logo";

const scaleWidth = {
  0: { scaleX: 0, opacity: 0 },
  0.2: { opacity: 1 },
  1: { scaleX: 1, opacity: 1 },
};

const premiumZoomIn = {
  0: { opacity: 0, scale: 0.85, translateY: 15 },
  1: { opacity: 1, scale: 1, translateY: 0 },
};

export default function AnimatedSplash({
  onFinish,
}: {
  onFinish: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animatable.View
        animation={premiumZoomIn}
        duration={1400}
        easing="ease-out-back"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View >
          <Logo />
        </View>
      </Animatable.View>

      <Animatable.View
        animation={scaleWidth}
        delay={800}
        duration={1200}
        easing="ease-in-out"
        style={{
          width: 140,
          height: 3,
          backgroundColor: "#fff",
          borderRadius: 10,
          marginTop: 24,
        }}
      />
    </View>
  );
}