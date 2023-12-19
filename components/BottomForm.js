import { View, Text, StyleSheet, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { deleteAddress } from "../api";
import { showToast } from "../helpers";
import Toast from "react-native-root-toast";
import MyButton from "./MyButton";
import { colors } from "../theme";
import { useDeviceAddresses } from "../AddressesContext";

const BottomForm = ({ selectedId, getAllAddresses, setSelectedId }) => {
  const [currentShop, setCurrentShop] = useState({});
  const { deviceAddressIds } = useDeviceAddresses();

  useEffect(() => {
    const shop = deviceAddressIds.find((shop) => shop._id === selectedId);
    setCurrentShop(shop || {});
  }, [selectedId, deviceAddressIds]);

  const deleteShop = async () => {
    const response = await deleteAddress(selectedId);
    if (response.message === "Address deleted successfully!") {
      showToast("Deleted Shop!", true, Toast.positions.TOP);
      getAllAddresses();
      setSelectedId("");
    } else {
      showToast("Something went wrong", false, Toast.positions.TOP);
    }
  };

  const openLink = () => {
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
    <View>
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
  bottomFormButtonsWrapper: {
    display: "flex",
    flexDirection: "column",
  },
});
