import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors, regFont } from "../theme";

const MyButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 10,
    display: "flex",
    backgroundColor: colors.licorice,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
    borderWidth: 2,
    borderColor: colors.rose,
  },
  buttonText: { color: colors.tan, fontFamily: regFont.fontFamily },
});
