import { View, StyleSheet, Animated, Easing, Platform } from "react-native";
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
  setListOfAddresses,
  listOfAddresses,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;

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
      transform:
        selectedId === ""
          ? Platform.OS === "ios" && Platform.isPad
            ? "translateY(100px)"
            : "translateY(100px)"
          : "translateY(150px)",
    },
    singleForm: {},
  });
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: selectedId ? 0 : 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim2, {
        toValue: selectedId ? 0 : 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ]).start();
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
                  outputRange: [0, hp("50%")],
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
          setListOfAddresses={setListOfAddresses}
          listOfAddresses={listOfAddresses}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.singleForm,
          {
            transform: [
              {
                translateY: slideAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    hp("80%"),
                    Platform.OS === "ios" && Platform.isPad
                      ? -hp("10%")
                      : -hp("14%"),
                  ],
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
          setListOfAddresses={setListOfAddresses}
          listOfAddresses={listOfAddresses}
        />
      </Animated.View>
    </View>
  );
};

export default BottomFormWrappers;
