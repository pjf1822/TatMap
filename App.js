import { Image, StyleSheet, Text, View } from "react-native";
import Mapbox, { PointAnnotation } from "@rnmapbox/maps";

import { useEffect, useRef, useState } from "react";
import { fetchAddresses } from "./api";

Mapbox.setAccessToken(
  "pk.eyJ1IjoicGpmMTgyMiIsImEiOiJjbGZybHJsMXMwMmd3M3BwMmFiZXlvZjczIn0.68xXIxxj_-iONU42ihPWZA"
);

export default function App() {
  const [listOfAddresses, setListOfAddresses] = useState([]);
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [addressSelected, setAddressSelected] = useState(false);
  //  map things
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(3);

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

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          projection="globe"
          styleURL="mapbox://styles/pjf1822/clekajgr3000001l8y22r3psx"
          style={styles.map}
          logoEnabled="false"
          scaleBarEnabled="false"
        >
          {listOfAddresses.map((address) => (
            <PointAnnotation
              ref={(ref) => (this.markerRef = ref)}
              key={address._id}
              id={address._id}
              coordinate={[address.coordinates[0], address.coordinates[1]]}
              title={"hey"}
              snippet={"hey"}
            >
              <Image
                source={require("./assets/icons8-dick-64.png")}
                style={{ width: 30, height: 30 }}
                onLoad={() => this.markerRef.refresh()}
              />
            </PointAnnotation>
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
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
