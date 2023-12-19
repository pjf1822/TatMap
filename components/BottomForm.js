import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { deleteShop, openLink } from "../helpers";
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

  return (
    <View>
      <Text style={{ color: colors.licorice, width: "100%" }}>
        {currentShop.description}
      </Text>
      <View style={styles.bottomFormButtonsWrapper}>
        <MyButton
          onPress={() => openLink(currentShop)}
          text={"Go to shops Instagram page"}
        />
        <MyButton
          onPress={() => deleteShop(getAllAddresses, setSelectedId, selectedId)}
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
});
