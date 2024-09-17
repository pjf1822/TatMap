import { StyleSheet, View } from "react-native";
import HomeScreen from "./components/HomeScreen";
import { useFonts } from "expo-font";

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
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
});
