import { View, Image, StyleSheet, Platform } from "react-native";
import React, { useState, useRef } from "react";
import BottomFormWrappers from "./BottomFormWrappers";
import Mapbox from "@rnmapbox/maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapPoint from "./MapPoint";
import TemporaryPoint from "./TemporaryPoint";
import { handleMapIdle } from "../helpers";

import { MAPBOX_ACCESS_TOKEN } from "@env";
import { colors } from "../theme";
import { useAddress } from "../AddressContext";
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const HomeScreen = () => {
  const [selectedShop, setSelectedShop] = useState(undefined);
  const [coordinates, setCoordinates] = useState(null);
  const [zoom, setZoom] = useState(4);
  const mapRef = useRef(null);
  const { addresses } = useAddress();

  return (
    <View style={styles.page}>
      <View style={styles.logoWrapper}>
        <Image source={require("../assets/icon2.png")} style={styles.logo} />
      </View>

      <BottomFormWrappers
        setCoordinates={setCoordinates}
        setZoom={setZoom}
        selectedShop={selectedShop}
        setSelectedShop={setSelectedShop}
      />

      <View style={styles.container}>
        <Mapbox.MapView
          projection="globe"
          styleURL="mapbox://styles/pjf1822/clekajgr3000001l8y22r3psx"
          style={styles.map}
          logoEnabled="false"
          localizeLabels={false}
          scaleBarEnabled="false"
          ref={mapRef}
          onMapIdle={() => handleMapIdle(mapRef)}
          onPress={() => setSelectedShop(undefined)}
          showsUserLocation={false}
        >
          {addresses?.map((address) => (
            <MapPoint
              address={address}
              key={address?.id}
              setSelectedShop={setSelectedShop}
            />
          ))}
          <TemporaryPoint coordinates={coordinates} />

          <Mapbox.Camera zoomLevel={zoom} centerCoordinate={coordinates} />
        </Mapbox.MapView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "100%",
  },

  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  map: {
    flex: 1,
  },
  logoWrapper: {
    height: Platform.OS === "ios" && Platform.isPad ? 140 : hp("12%"),

    width: Platform.OS === "ios" && Platform.isPad ? 140 : wp("29%"),
    position: "absolute",
    top: hp("7%"),
    left: wp("7%"),
    zIndex: 99,
    borderRadius: 50,
    // borderWidth: 3,
    borderColor: colors.licorice,
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
