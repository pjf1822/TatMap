import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { deleteShop, openLink } from "../helpers";
import MyButton from "./MyButton";
import { colors, regFont } from "../theme";
import { useDeviceAddresses } from "../AddressesContext";

const BottomForm = ({ selectedId, getAllAddresses, setSelectedId }) => {
  const [currentShop, setCurrentShop] = useState({});
  const { deviceAddressIds, setDeviceAddressIds } = useDeviceAddresses();

  useEffect(() => {
    const shop = deviceAddressIds.find((shop) => shop._id === selectedId);
    setCurrentShop(shop || {});
  }, [selectedId, deviceAddressIds]);

  return (
    <View>
      <Text style={styles.bottomFormText}>{currentShop.description}</Text>
      <View style={styles.bottomFormButtonsWrapper}>
        <MyButton
          onPress={() => openLink(currentShop)}
          text={"Go to shops Instagram page"}
        />
        <MyButton
          onPress={() =>
            deleteShop(
              getAllAddresses,
              setSelectedId,
              selectedId,
              setDeviceAddressIds
            )
          }
          text={"Delete Shop"}
        />
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
    fontFamily: regFont.fontFamily,
    fontSize: 20,
  },
});
