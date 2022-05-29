import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Vibration,
} from "react-native";
import {
  useFonts,
  Arimo_400Regular,
  Arimo_700Bold,
} from "@expo-google-fonts/arimo";
import Menu from "./components/menu";
import { Timer } from "react-native-stopwatch-timer";
import { Audio } from "expo-av";

export default function App() {
  let winner = "white";

  let white = 5000;
  let black = 5000;

  const [showModal, setShowModal] = useState(false);

  const [whiteTimerDuration, setWhiteTimerDuration] = useState(white);
  const [isWhiteTurn, setIsWhiteTurn] = useState(false);
  const [resetWhiteClock, setResetWhiteClock] = useState(false);

  const [blackTimerDuration, setBlackTimerDuration] = useState(black);
  const [isBlackTurn, setIsBlackTurn] = useState(false);
  const [resetBlackClock, setResetBlackClock] = useState(false);

  const [showWhiteMs, setShowWhiteMs] = useState(false);
  const [showBlackMs, SetShowBlackMs] = useState(false);

  const [moveCounter, setMoveCounter] = useState(0);

  const [sound, setSound] = useState(null);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./components/audio/mixkit-mouse-click-close-1113.wav")
    );
    await sound.playAsync();
  };

  const setTimers = (whiteTimer, blackTimer) => {
    white = parseInt(whiteTimer);
    black = parseInt(blackTimer);

    setWhiteTimerDuration(white);
    setBlackTimerDuration(black);

    setResetWhiteClock(true);
    setResetBlackClock(true);

    setIsBlackTurn(false);
    setIsWhiteTurn(false);

    setResetWhiteClock(false);
    setResetBlackClock(false);

    setShowModal(false);

    setIsBlackTurn(false);
    setIsWhiteTurn(false);

    setResetWhiteClock(true);
    setResetBlackClock(true);

    setMoveCounter(0);

    console.log(whiteTimerDuration);
    console.log(blackTimerDuration);
  };

  const resetTimers = () => {
    if (isBlackTurn == true) {
      setIsBlackTurn(false);
      setResetBlackClock(true);
      setResetWhiteClock(true);
    } else if (isWhiteTurn == true) {
      setIsWhiteTurn(false);
      setResetBlackClock(true);
      setResetWhiteClock(true);
    } else {
      setIsBlackTurn(false);
      setIsWhiteTurn(false);
      setResetBlackClock(true);
      setResetWhiteClock(true);
    }

    setIsBlackTurn(false);
    setIsWhiteTurn(false);
    setWhiteTimerDuration(white);
    setBlackTimerDuration(black);

    setMoveCounter(0);
  };

  const openAndCloseModal = () => {
    resetTimers();
    setShowModal(!showModal);
  };

  const handleWhitePress = () => {
    setResetWhiteClock(false);
    setResetBlackClock(false);
    setIsBlackTurn(true);
    setIsWhiteTurn(false);
  };

  const handleBlackPress = () => {
    setResetWhiteClock(false);
    setResetBlackClock(false);
    setIsWhiteTurn(true);
    setIsBlackTurn(false);
    setMoveCounter(moveCounter + 1);
  };

  const createThreeButtonAlert = (winner) =>
    Alert.alert("Time is up!", "Winner: " + winner, [
      {
        text: "OK",
        onPress: () => {
          resetTimers();
        },
      },
    ]);

  let [fontsLoaded] = useFonts({
    Arimo_400Regular,
    Arimo_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'center',
      justifyContent: "center",
    },
    blackField: {
      backgroundColor: "#263238",
      justifyContent: "center",
      alignItems: "center",
      transform: [{ rotate: "180deg" }],
      flex: 5,
    },
    whiteField: {
      backgroundColor: "#fafafa",
      justifyContent: "center",
      alignItems: "center",
      flex: 5,
    },
    menu: {
      backgroundColor: "#78909c",
      justifyContent: "center",
      alignItems: "center",
      flex: 2,
    },
    blackFieldText: {
      fontFamily: "Arimo_700Bold",
      color: "#f5f5f5",
      fontSize: 70,
    },
    whiteFieldText: {
      fontFamily: "Arimo_700Bold",
      color: "#263238",
      fontSize: 70,
    },
    whiteOpacity: {
      flex: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    blackOpacity: {},
  });

  const whiteFieldOptions = {
    container: {
      padding: 5,
      borderRadius: 5,
      alignItems: "center",
    },
    text: {
      fontFamily: "Arimo_700Bold",
      color: "#263238",
      fontSize: 80,
    },
  };

  const blackFieldOptions = {
    container: {
      padding: 5,
      borderRadius: 5,
      alignItems: "center",
    },
    text: {
      fontFamily: "Arimo_700Bold",
      color: "#f5f5f5",
      fontSize: 80,
    },
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleBlackPress}
        onPressIn={playSound}
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
        disabled={isWhiteTurn}
      >
        <Timer
          totalDuration={whiteTimerDuration}
          msecs={false}
          start={isBlackTurn}
          reset={resetBlackClock}
          options={blackFieldOptions}
          handleFinish={() => {
            //white win
            winner = "white";
            createThreeButtonAlert(winner);
          }}
          getTime={(time) => {
            //console.log(time);
          }}
        />
      </TouchableOpacity>

      <View style={styles.menu}>
        <Menu
          showModal={showModal}
          moveCounter={moveCounter}
          openAndCloseModal={openAndCloseModal}
          setTimers={setTimers}
          resetTimers={resetTimers}
        />
      </View>

      <TouchableOpacity
        onPress={handleWhitePress}
        onPressIn={playSound}
        style={{
          flex: 5,
          justifyContent: "center",
          backgroundColor: "black",
        }}
        disabled={isBlackTurn || moveCounter == 0}
      >
        <Timer
          totalDuration={blackTimerDuration}
          msecs={false}
          start={isWhiteTurn}
          reset={resetWhiteClock}
          options={whiteFieldOptions}
          handleFinish={() => {
            //black win
            winner = "black";
            createThreeButtonAlert(winner);
          }}
          getTime={(time) => {
            //console.log(time);
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
