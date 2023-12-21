import { View, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors, regFont } from "../theme";
import { forwardGeocoding } from "../helpers";
import { GOOGLE_AUTOCORRECT_ACCESS_TOKEN } from "@env";

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
            paddingBottom: 7,
            paddingTop: 7,
          },

          textInput: {
            color: colors.licorice,
            fontFamily: regFont.fontFamilyBold,
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
            fontFamily: regFont.fontFamilyBold,
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
        currentLocation={false}
        onFail={(error) => {
          console.error("Google Places Autocomplete failed:", error);
        }}
        suppressDefaultStyles={true}
        query={{
          key: GOOGLE_AUTOCORRECT_ACCESS_TOKEN,
          language: "en",
        }}
        ref={autocompleteRef}
      />
      {isInputEmpty()}
    </View>
  );
};

export default AddressSearchForm;
