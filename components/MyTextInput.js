import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors, regFont } from "../theme";

const MyTextInput = ({ onChangeText, onBlur, value, placeholder }) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      style={styles.formTextInput}
      placeholder={placeholder}
      placeholderTextColor="rgba(100, 90, 80, 0.5)"
    />
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  formTextInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
    marginTop: 2,
    marginBottom: 2,
    color: colors.licorice,
    fontFamily: regFont.fontFamilyBold,
    // shadowColor: colors.licorice,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
});
