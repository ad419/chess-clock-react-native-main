import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <LottieView
        autoPlay={true}
        loop={false}
        source={require("./animation/55019-mcm-chess-animation.json")}
        onAnimationFinish={() => navigation.navigate("Main")}
        speed={0.5}
      />
    </View>
  );
};

export default Splash;
