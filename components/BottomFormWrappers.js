import { View, StyleSheet } from "react-native";
import DescriptionForm from "./DescriptionForm";
import BottomForm from "./BottomForm";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomFormWrappers = ({
  setCoordinates,
  setZoom,
  selectedShop,
  setSelectedShop,
}) => {
  const handleFetchAsyncStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem("device_addresses");
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData); // Parse if it's a JSON string
        console.log(parsedData, "the device addresses");
      } else {
        console.log("No device addresses found.");
      }
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };
  const handleDeleteDeviceAddresses = async () => {
    try {
      // Remove the specific key 'device_addresses'
      await AsyncStorage.removeItem("device_addresses");
      console.log("device_addresses has been removed from AsyncStorage");
    } catch (error) {
      console.error(
        "Error deleting device_addresses from AsyncStorage:",
        error
      );
    }
  };

  return (
    <View style={styles.formsWrapper}>
      {selectedShop ? (
        <BottomForm
          selectedShop={selectedShop}
          setSelectedShop={setSelectedShop}
        />
      ) : (
        <DescriptionForm setCoordinates={setCoordinates} setZoom={setZoom} />
      )}
    </View>
  );
};

export default BottomFormWrappers;

const styles = StyleSheet.create({
  formsWrapper: {
    position: "absolute",
    padding: 10,
    width: wp("100%"),
    bottom: 1,
    right: wp("0%"),
    zIndex: 99,
    borderTopWidth: 2,
    borderTopColor: colors.licorice,
    backgroundColor: colors.tan,
  },
});
