import { View, Image, StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import BottomFormWrappers from "./BottomFormWrappers";
import { useDeviceAddresses } from "../AddressesContext";
import Mapbox from "@rnmapbox/maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapPoint from "./MapPoint";
import TemporaryPoint from "./TemporaryPoint";
import { getAllAddresses, handleLongPress, handleMapIdle } from "../helpers";
import { fetchAddresses } from "../api";

Mapbox.setAccessToken(
  "pk.eyJ1IjoicGpmMTgyMiIsImEiOiJjbGZybHJsMXMwMmd3M3BwMmFiZXlvZjczIn0.68xXIxxj_-iONU42ihPWZA"
);

const HomeScreen = () => {
  const { deviceAddressIds, setDeviceAddressIds } = useDeviceAddresses();
  const [selectedId, setSelectedId] = useState("");
  const [listOfAddresses, setListOfAddresses] = useState([]);

  // two states for when you select an address in the google address text input
  const [coordinates, setCoordinates] = useState(null);
  const [zoom, setZoom] = useState(4);
  const mapRef = useRef(null);

  const getAllAddresses = async () => {
    try {
      const data = await fetchAddresses();
      setListOfAddresses(data);
    } catch (error) {
      console.error(
        "An error occurred while fetching the transactions:",
        error
      );
    }
  };
  // EFFECT TO RUN THE INITAL API CALL
  useEffect(() => {
    getAllAddresses();
  }, []);

  return (
    <View style={styles.page}>
      <Image source={require("../assets/TatMap.png")} style={styles.logo} />

      <BottomFormWrappers
        getAllAddresses={getAllAddresses}
        setCoordinates={setCoordinates}
        setZoom={setZoom}
        selectedId={selectedId}
        listOfAddresses={listOfAddresses}
        setListOfAddresses={setListOfAddresses}
        setSelectedId={setSelectedId}
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
          onLongPress={handleLongPress}
          onPress={() => setSelectedId("")}
        >
          {listOfAddresses?.map((address) => (
            <MapPoint
              address={address}
              key={address?._id}
              setSelectedId={setSelectedId}
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
  },

  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
  logo: {
    height: hp("13%"),
    width: wp("13%"),
    position: "absolute",
    top: hp("10%"),
    left: wp("10%"),
    zIndex: 99,
  },
});
