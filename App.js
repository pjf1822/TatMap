import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import Mapbox from "@rnmapbox/maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useRef, useState } from "react";
import { fetchAddresses } from "./api";
import MapPoint from "./components/MapPoint";
import TemporaryPoint from "./components/TemporaryPoint";
import BottomFormWrappers from "./components/BottomFormWrappers";

Mapbox.setAccessToken(
  "pk.eyJ1IjoicGpmMTgyMiIsImEiOiJjbGZybHJsMXMwMmd3M3BwMmFiZXlvZjczIn0.68xXIxxj_-iONU42ihPWZA"
);

export default function App() {
  const [listOfAddresses, setListOfAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  // two states for when you select an address in the google address text input
  const [coordinates, setCoordinates] = useState(null);
  const [zoom, setZoom] = useState(4);
  const mapRef = useRef(null);

  const getAllAddresses = async () => {
    try {
      const data = await fetchAddresses();
      Mapbox.setTelemetryEnabled(false);
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

  const handleMapIdle = async () => {
    if (mapRef.current) {
      const centerPointInView = await mapRef.current.getPointInView([0.5, 0.5]);
      const centerCoordinate = await mapRef.current.getCoordinateFromView(
        centerPointInView
      );

      // console.log("Center Coordinate:", centerCoordinate);
    }
  };

  const handleLongPress = async (event) => {
    const { geometry } = event;
    const longPressCoordinates = geometry.coordinates;

    // console.log("Long Press Coordinates:", longPressCoordinates);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.page}>
        <Image source={require("./assets/TatMap.png")} style={styles.logo} />

        <BottomFormWrappers
          getAllAddresses={getAllAddresses}
          setCoordinates={setCoordinates}
          setZoom={setZoom}
          listOfAddresses={listOfAddresses}
          selectedId={selectedId}
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
            onMapIdle={handleMapIdle}
            onLongPress={handleLongPress}
            onPress={() => setSelectedId("")}
          >
            {listOfAddresses.map((address) => (
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
    </KeyboardAvoidingView>
  );
}

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
