import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { deleteAddress } from "../api";
import { showToast } from "../helpers";
import Toast from "react-native-root-toast";
import MyButton from "./MyButton";
import { colors } from "../theme";

const BottomForm = ({ selectedId, getAllAddresses, listOfAddresses }) => {
  const [currentShop, setCurrentShop] = useState({});
  useEffect(() => {
    const shop = listOfAddresses.find((shop) => shop._id === selectedId);
    setCurrentShop(shop || {});
  }, [selectedId, listOfAddresses]);

  const deleteShop = async () => {
    const response = await deleteAddress(selectedId);
    if (response.message === "Address deleted successfully!") {
      showToast("Deleted Shop!", true, Toast.positions.TOP);
      getAllAddresses();
    } else {
      showToast("Something went wrong", false, Toast.positions.TOP);
    }
  };

  console.log(currentShop);
  const openLink = () => {
    // Check if the shop has a valid link
    if (currentShop?.link) {
      Linking.canOpenURL(currentShop.link).then((supported) => {
        if (supported) {
          Linking.openURL(currentShop.link);
        } else {
          showToast(
            "Cannot open the link. App not installed.",
            false,
            Toast.positions.TOP
          );
        }
      });
    }
  };

  return (
    <View style={styles.bottomFormWrapper}>
      <Text style={{ color: colors.licorice, width: "100%" }}>
        {currentShop.description}
      </Text>
      <View style={styles.bottomFormButtonsWrapper}>
        <MyButton onPress={openLink} text={"Go to shops Instagram page"} />
        <MyButton onPress={deleteShop} text={"Delete Shop"} />
      </View>
    </View>
  );
};

export default BottomForm;

const styles = StyleSheet.create({
  bottomFormWrapper: {
    position: "absolute",
    padding: 10,
    width: wp("80%"),
    top: hp("85%"),
    left: wp("10%"),
    zIndex: 99,
    backgroundColor: colors.rose,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomFormButtonsWrapper: {
    display: "flex",
    flexDirection: "column",
  },
});
