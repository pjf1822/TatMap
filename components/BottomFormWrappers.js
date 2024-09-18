import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  Button,
} from "react-native";
import React, { useEffect, useRef } from "react";
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
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;

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
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: selectedShop ? 0 : 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim2, {
        toValue: selectedShop ? 0 : 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ]).start();
  }, [selectedShop]);

  return (
    <View style={styles.formsWrapper}>
      {/* <Animated.View
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
          selectedShop={selectedShop}
          setSelectedShop={setSelectedShop}
        />
      </Animated.View> */}

      <Animated.View
        style={[
          styles.singleForm,
          {
            // transform: [
            //   {
            //     translateY: slideAnim2.interpolate({
            //       inputRange: [0, 1],
            //       outputRange: [
            //         hp("80%"),
            //         Platform.isPad ? -hp("10%") : -hp("14%"),
            //       ],
            //     }),
            //   },
            // ],
          },
        ]}
      >
        <DescriptionForm setCoordinates={setCoordinates} setZoom={setZoom} />
      </Animated.View>
      {/* <Button
          title="Fetch AsyncStorage Data"
          onPress={handleFetchAsyncStorage}
        /> */}
      {/* <Button
          title="delete AsyncStorage Data"
          onPress={handleDeleteDeviceAddresses}
        /> */}
    </View>
  );
};

export default BottomFormWrappers;
