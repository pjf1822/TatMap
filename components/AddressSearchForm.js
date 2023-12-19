import { View, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors, regFont } from "../theme";
import { forwardGeocoding } from "../helpers";

const AddressSearchForm = ({
  handleChange,
  autocompleteRef,
  setCoordinates,
  setZoom,
}) => {
  const isInputEmpty = () => {
    const inputValue = autocompleteRef.current?.getAddressText() || "";
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
            fontFamily: regFont.fontFamily,
          },
          separator: {
            height: 0.9,
            backgroundColor: colors.gray,
          },
          row: {
            placeholderColor: "yellow",
            padding: 13,
            height: 44,
            flexDirection: "row",
            fontFamily: regFont.fontFamily,
          },
        }}
        placeholder="Search Address"
        onPress={(data, details = null) => {
          forwardGeocoding(
            data?.description,
            setCoordinates,
            setZoom,
            handleChange
          );
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
