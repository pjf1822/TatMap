import { View, StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
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
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const slideValue = selectedId ? 0 : 1;
    Animated.timing(slideAnim, {
      toValue: slideValue,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [selectedId, slideAnim]);

  return (
    <View style={styles.formsWrapper}>
      <Animated.View
        style={[
          styles.singleForm,

          {
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [hp("2%"), hp("90%")],
                }),
              },
            ],
          },
        ]}
      >
        <BottomForm
          selectedId={selectedId}
          getAllAddresses={getAllAddresses}
          setSelectedId={setSelectedId}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.singleForm,
          {
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [hp("50%"), hp("-14")],
                }),
              },
            ],
          },
        ]}
      >
        <DescriptionForm
          getAllAddresses={getAllAddresses}
          setCoordinates={setCoordinates}
          setZoom={setZoom}
        />
      </Animated.View>
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
    backgroundColor: colors.tan,
    maxHeight: hp("22%"),
  },
  singleForm: {},
});
