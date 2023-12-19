import { View, StyleSheet } from "react-native";
import React from "react";
import DescriptionForm from "./DescriptionForm";
import BottomForm from "./BottomForm";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../theme";

const BottomFormWrappers = ({
  getAllAddresses,
  setCoordinates,
  setZoom,
  selectedId,
  setSelectedId,
}) => {
  return (
    <View style={styles.formsWrapper}>
      {selectedId ? (
        <BottomForm
          selectedId={selectedId}
          getAllAddresses={getAllAddresses}
          setSelectedId={setSelectedId}
        />
      ) : (
        <DescriptionForm
          getAllAddresses={getAllAddresses}
          setCoordinates={setCoordinates}
          setZoom={setZoom}
        />
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
    bottom: 15,
    right: wp("0%"),
    display: "flex",
    justifyContent: "space-between",
    zIndex: 99,
    backgroundColor: colors.rose,
  },
});
