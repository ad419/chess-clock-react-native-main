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
import { Feather } from "@expo/vector-icons";

import Main from "./components/main.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./components/Splash";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
