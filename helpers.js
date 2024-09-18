import Toast from "react-native-root-toast";
import { colors, regFont } from "./theme";
import { Linking } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const showToast = (toastMessage, success, position) => {
  let toast = Toast.show(toastMessage, {
    duration: Toast.durations.LONG,
    position: position,
    backgroundColor: success === true ? colors.blue : colors.licorice,
    textColor: colors.tan,
    opacity: 1,
    fontFamily: regFont.fontFamilyBold,
    fontSize: 23,
    // shadow: true,
    // shadowColor: colors.tan,
  });
};

export const handleSubmit = async (values) => {
  try {
    // CREATE
    const newDocRef = doc(collection(db, "addresses"));

    const newAddress = {
      description: values?.description,
      link: values?.link,
      coordinates: [values?.newCoords[0], values?.newCoords[1]],
      createdAt: new Date(),
      id: newDocRef?.id,
    };

    await setDoc(newDocRef, newAddress);

    // ASYNC
    const deviceAddresses = await AsyncStorage.getItem("device_addresses");
    let parsedAddresses = [];

    if (deviceAddresses) {
      parsedAddresses = JSON.parse(deviceAddresses) || [];
    }

    parsedAddresses.push(newDocRef.id);

    await AsyncStorage.setItem(
      "device_addresses",
      JSON.stringify(parsedAddresses)
    );

    // Keyboard.dismiss();
    // reset forms

    return newAddress;
  } catch (error) {
    showToast("Something went wrong!", false, Toast.positions.TOP);
    console.error("Error creating address:", error);
  }
};

export const openLink = (currentShop) => {
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

export const handleMapIdle = async (mapRef) => {
  if (mapRef.current) {
    const centerPointInView = await mapRef.current.getPointInView([0.5, 0.5]);
    const centerCoordinate = await mapRef.current.getCoordinateFromView(
      centerPointInView
    );

    // console.log("Center Coordinate:", centerCoordinate);
  }
};

export const forwardGeocoding = async (
  address,
  setCoordinates,
  setZoom,
  handleChange
) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=pk.eyJ1IjoicGpmMTgyMiIsImEiOiJjbGZybHJsMXMwMmd3M3BwMmFiZXlvZjczIn0.68xXIxxj_-iONU42ihPWZA`
    );

    const coordinates =
      response?.data?.features &&
      response?.data?.features?.length > 0 &&
      response?.data?.features[0]?.geometry.coordinates;
    if (coordinates) {
      setCoordinates(coordinates);
      setZoom(10);
      handleChange({ target: { name: "newCoords", value: coordinates } });
    }
  } catch (error) {
    console.error("Error during forward geocoding:", error);
  }
};
