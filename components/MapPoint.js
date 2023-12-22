import { Image, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { PointAnnotation } from "@rnmapbox/maps";
import { colors } from "../theme";

const MapPoint = ({ address, setSelectedId }) => {
  const markerRef = useRef(null);

  return (
    <PointAnnotation
      ref={markerRef}
      id={address?._id}
      coordinate={[address?.coordinates[0], address?.coordinates[1]]}
      title={"hey"}
      snippet={"hey"}
      onSelected={() => setSelectedId(address._id)}
      onDeselected={() => setSelectedId("")}
    >
      <View style={styles.logoWrapper}>
        <Image
          source={require("../assets/icon1.png")}
          onLoad={() => markerRef?.current?.refresh()}
          style={styles.logo}
        />
      </View>
    </PointAnnotation>
  );
};

export default MapPoint;

const styles = StyleSheet.create({
  logoWrapper: {
    height: 60,
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
