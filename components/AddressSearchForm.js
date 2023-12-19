import { View, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import { colors } from "../theme";

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
        setCoordinates(coordinates);
        setZoom(10);
        handleChange({ target: { name: "newCoords", value: coordinates } });
      }
    } catch (error) {
      console.error("Error during forward geocoding:", error);
    }
  };
  const isInputEmpty = () => {
    const inputValue = autocompleteRef.current?.getAddressText() || "";
    // console.log(inputValue, "whatever this is ");
  };

  return (
    <View>
      <GooglePlacesAutocomplete
        styles={{
          textInputContainer: {
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "black",
            padding: 10,
            marginTop: 2,
            marginBottom: 2,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
          poweredContainer: {
            display: "none",
          },

          textInput: {
            color: colors.licorice,
          },
          separator: {
            height: 0.5,
            backgroundColor: colors.blue,
          },
          row: {
            placeholderColor: "yellow",
            padding: 13,
            height: 44,
            flexDirection: "row",
          },
        }}
        placeholder="Search Address"
        onPress={(data, details = null) => {
          forwardGeocoding(data?.description);
        }}
        onFail={(error) => {
          console.error("Google Places Autocomplete failed:", error);
        }}
        suppressDefaultStyles={true}
        query={{
          key: "AIzaSyAEg44iVbUHQP7x9Qw6r_ukiy18taLCuzE",
          language: "en",
        }}
        ref={autocompleteRef}
      />
      {isInputEmpty()}
    </View>
  );
};

export default AddressSearchForm;

const styles = StyleSheet.create({
  formTextInput: {},
});
