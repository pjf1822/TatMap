import { Image, Platform, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { PointAnnotation } from "@rnmapbox/maps";
import { colors } from "../theme";

const TemporaryPoint = ({ coordinates }) => {
  const markerRef = useRef(null);

  return (
    <>
      {coordinates && (
        <PointAnnotation
          ref={markerRef}
          id={"1"}
          coordinate={coordinates}
          title={"hey"}
          snippet={"hey"}
        >
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require("../assets/icon2.png")}
              onLoad={() => markerRef?.current?.refresh()}
            />
          </View>
        </PointAnnotation>
      )}
    </>
  );
};

export default TemporaryPoint;

const styles = StyleSheet.create({
  logoWrapper: {
    height: Platform.OS === "ios" && Platform.isPad ? 80 : 60,
    aspectRatio: 1,
    borderRadius: 50,
    // borderWidth: 3,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.gray,
    transform: [
      { scale: 0.83 }, // Adjust the scale factor for zooming
    ],
  },
  logo: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
});
