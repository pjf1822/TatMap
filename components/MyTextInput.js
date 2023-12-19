import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "../theme";

const MyTextInput = ({ onChangeText, onBlur, value, placeholder }) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      style={styles.formTextInput}
      placeholder={placeholder}
      placeholderTextColor="rgba(0, 0, 0, 0.3)"
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
  },
});
