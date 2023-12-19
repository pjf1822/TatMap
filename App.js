import { StyleSheet, KeyboardAvoidingView } from "react-native";
import Mapbox from "@rnmapbox/maps";
import HomeScreen from "./components/HomeScreen";
import { DeviceAddressesProvider } from "./AddressesContext";

Mapbox.setAccessToken(
  "pk.eyJ1IjoicGpmMTgyMiIsImEiOiJjbGZybHJsMXMwMmd3M3BwMmFiZXlvZjczIn0.68xXIxxj_-iONU42ihPWZA"
);

export default function App() {
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
