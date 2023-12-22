import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import HomeScreen from "./components/HomeScreen";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Quicksand: require("./assets/Quicksand.ttf"),
          QuicksandBold: require("./assets/Quicksand-SemiBold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HomeScreen />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
