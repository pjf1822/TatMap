import { StyleSheet, View } from "react-native";
import HomeScreen from "./components/HomeScreen";
import { useFonts } from "expo-font";
import { AddressProvider } from "./AddressContext";

export default function App() {
  const [loaded, error] = useFonts({
    Quicksand: require("./assets/Quicksand.ttf"),
    QuicksandBold: require("./assets/Quicksand-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <AddressProvider>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </AddressProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
});
