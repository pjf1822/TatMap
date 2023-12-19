import { StyleSheet, KeyboardAvoidingView } from "react-native";
import Mapbox from "@rnmapbox/maps";
import HomeScreen from "./components/HomeScreen";
import { DeviceAddressesProvider } from "./AddressesContext";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

Mapbox.setAccessToken(
  "pk.eyJ1IjoicGpmMTgyMiIsImEiOiJjbGZybHJsMXMwMmd3M3BwMmFiZXlvZjczIn0.68xXIxxj_-iONU42ihPWZA"
);

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
    <DeviceAddressesProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <HomeScreen />
      </KeyboardAvoidingView>
    </DeviceAddressesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
