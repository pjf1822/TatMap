import { View, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";

const AddressSearchForm = ({
  handleChange,
  autocompleteRef,
  setCoordinates,
  setZoom,
}) => {
  const forwardGeocoding = async (address) => {
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
        console.log(coordinates, "inside the search form");
        setCoordinates(coordinates);
        setZoom(10);
        handleChange({ target: { name: "newCoords", value: coordinates } });
      }
    } catch (error) {
      console.error("Error during forward geocoding:", error);
    }
  };

  return (
    <View style={styles.formWrapper}>
      <GooglePlacesAutocomplete
        placeholder="Search Address"
        onPress={(data, details = null) => {
          forwardGeocoding(data?.description);
        }}
        onFail={(error) => {
          console.error("Google Places Autocomplete failed:", error);
          // Handle the failure here, e.g., show an error message to the user.
        }}
        query={{
          key: "AIzaSyAEg44iVbUHQP7x9Qw6r_ukiy18taLCuzE",
          language: "en",
        }}
        ref={autocompleteRef}
      />
    </View>
  );
};

export default AddressSearchForm;

const styles = StyleSheet.create({
  formWrapper: {
    // position: "absolute",
    // padding: 10,
    // width: wp("70%"),
    // top: hp("4%"),
    // right: wp("0%"),
    // zIndex: 99,
    // backgroundColor: "white",
  },
});
