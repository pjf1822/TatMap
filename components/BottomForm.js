import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { deleteShop, openLink, showToast } from "../helpers";
import MyButton from "./MyButton";
import { colors, regFont } from "../theme";
import { useAddress } from "../AddressContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

const BottomForm = ({ selectedId, setSelectedId }) => {
  const [currentShop, setCurrentShop] = useState({});
  const { addresses, deleteAddress } = useAddress();

  useEffect(() => {
    const shop = addresses?.find((shop) => shop.id === selectedId);
    console.log(shop);
    setCurrentShop(shop || {});
  }, [selectedId, addresses]);

  const handleDeleteShop = async () => {
    deleteAddress(selectedId);
    const deviceAddresses = await AsyncStorage.getItem("device_addresses");
    const parsedAddresses = JSON.parse(deviceAddresses) || [];

    const updatedAddresses = parsedAddresses.filter((id) => id !== selectedId);

    await AsyncStorage.setItem(
      "device_addresses",
      JSON.stringify(updatedAddresses)
    );

    showToast("Deleted Shop!", true, Toast.positions.TOP);
    setSelectedId("");
  };
  return (
    <View>
      <Text style={styles.bottomFormText}>{currentShop.description}</Text>
      <View style={styles.bottomFormButtonsWrapper}>
        <MyButton
          onPress={() => openLink(currentShop)}
          text={"Go to shops Instagram page"}
        />

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={handleDeleteShop}
        >
          <Text style={styles.buttonText}>Delete Shop</Text>
        </TouchableOpacity>
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
  bottomFormText: {
    color: colors.licorice,
    width: "100%",
    display: "flex",
    width: "100%",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 7,
    fontFamily: regFont.fontFamilyBold,
    fontSize: 20,
  },

  buttonWrapper: {
    padding: 10,
    display: "flex",
    backgroundColor: colors.licorice,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
    borderWidth: 2,
    borderColor: colors.blue,
  },
  buttonText: {
    color: colors.tan,
    fontFamily: regFont.fontFamilyBold,
    fontSize: 17,
  },
});
