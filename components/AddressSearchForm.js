import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AddressSearchForm = () => {
  const [address, setAddress] = useState("");
  const onChangeText = (value) => {
    setAddress(value);
  };
  const handleSelect = (data, details) => {
    // 'details' contains additional information about the selected place.
    console.log(data, details);
    setAddress(data.description);
  };
  return (
    <View style={styles.formWrapper}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyC8SOXrOo0QTh9q6rDLqolhxoUeJWT-0Ms",
          language: "en",
        }}
      />
    </View>
  );
};

export default AddressSearchForm;

const styles = StyleSheet.create({
  formWrapper: {
    position: "absolute",
    padding: 10,
    width: wp("40%"),
    top: hp("10%"),
    right: wp("10%"),
    zIndex: 99,
    backgroundColor: "white",
  },
});
