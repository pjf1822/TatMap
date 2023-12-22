import Toast from "react-native-root-toast";
import { colors, regFont } from "./theme";
import { createAddress, deleteAddress } from "./api";
import { Keyboard, Linking } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const handleSubmit = async (
  values,
  actions,
  getAllAddresses,
  autocompleteRef,
  setCoordinates,

  setListOfAddresses
) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  // input error handling
  if (!values.description || !values.link || !values.newCoords.length) {
    showToast("Please fill out all of the fields", false, Toast.positions.TOP);
    return;
  }
  if (values.link && !urlRegex.test(values.link)) {
    showToast("Link needs to be a URL", false, Toast.positions.TOP);
    return;
  }

  try {
    const response = await createAddress({
      description: values?.description,
      link: values?.link,
      coordinates: {
        theLng: String(values?.newCoords[0]),
        theLat: String(values?.newCoords[1]),
      },
    });
    // async storage piece
    const deviceAddresses = await AsyncStorage.getItem("device_addresses");
    const parsedAddresses = JSON.parse(deviceAddresses) || [];
    parsedAddresses.push(response?.address?._id);

    await AsyncStorage.setItem(
      "device_addresses",
      JSON.stringify(parsedAddresses)
    );
    getAllAddresses(setListOfAddresses);
    Keyboard.dismiss();

    // reset forms
    autocompleteRef.current?.setAddressText("");
    actions.resetForm({
      values: {
        description: "",
        link: "",
        newCoords: [],
      },
    });
    setCoordinates(null);

    showToast("Shop added!", true, Toast.positions.TOP);
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

export const deleteShop = async (
  getAllAddresses,
  setSelectedId,
  selectedId,
  setListOfAddresses
) => {
  const response = await deleteAddress(selectedId);
  if (response.message === "Address deleted successfully!") {
    const deviceAddresses = await AsyncStorage.getItem("device_addresses");
    const parsedAddresses = JSON.parse(deviceAddresses) || [];

    const updatedAddresses = parsedAddresses.filter((id) => id !== selectedId);

    await AsyncStorage.setItem(
      "device_addresses",
      JSON.stringify(updatedAddresses)
    );
    showToast("Deleted Shop!", true, Toast.positions.TOP);
    getAllAddresses(setListOfAddresses);
    setSelectedId("");
  } else {
    showToast("Something went wrong", false, Toast.positions.TOP);
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

export const handleLongPress = async (event) => {
  const { geometry } = event;
  const longPressCoordinates = geometry.coordinates;

  // console.log("Long Press Coordinates:", longPressCoordinates);
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
