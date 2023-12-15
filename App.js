import { Image, StyleSheet, View } from "react-native";
import Mapbox from "@rnmapbox/maps";
import axios from "axios";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useState } from "react";
import { fetchAddresses } from "./api";
import MapPoint from "./components/MapPoint";
import AddressSearchForm from "./components/AddressSearchForm";

Mapbox.setAccessToken(
  "pk.eyJ1IjoicGpmMTgyMiIsImEiOiJjbGZybHJsMXMwMmd3M3BwMmFiZXlvZjczIn0.68xXIxxj_-iONU42ihPWZA"
);

export default function App() {
  const [listOfAddresses, setListOfAddresses] = useState([]);

  const getAllAddresses = async () => {
    try {
      const data = await fetchAddresses();

      console.log(data.map((addy) => addy.coordinates[0]));
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

  useEffect(() => {
    const forwardGeocoding = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            "67 plymouth ave braintree"
          )}.json?access_token=pk.eyJ1IjoicGpmMTgyMiIsImEiOiJjbGZybHJsMXMwMmd3M3BwMmFiZXlvZjczIn0.68xXIxxj_-iONU42ihPWZA`
        );

        const coordinates =
          response.data.features &&
          response.data.features.length > 0 &&
          response.data.features[0].geometry.coordinates;
      } catch (error) {
        console.error("Error during forward geocoding:", error);
      }
    };

    forwardGeocoding();
  }, []);

  return (
    <View style={styles.page}>
      <Image source={require("./assets/TatMap.png")} style={styles.logo} />
      <AddressSearchForm />
      <View style={styles.container}>
        <Mapbox.MapView
          projection="globe"
          styleURL="mapbox://styles/pjf1822/clekajgr3000001l8y22r3psx"
          style={styles.map}
          logoEnabled="false"
          scaleBarEnabled="false"
        >
          {listOfAddresses.map((address) => (
            <MapPoint address={address} key={address._id} />
          ))}
        </Mapbox.MapView>
      </View>
    </View>
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
