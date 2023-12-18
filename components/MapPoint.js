import { Image, Text, Linking, View, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { Callout, PointAnnotation } from "@rnmapbox/maps";

const MapPoint = ({ address }) => {
  const markerRef = useRef(null);
  const [calloutVisible, setCalloutVisible] = useState(false);

  const onAnnotationSelected = (feature) => {
    setCalloutVisible(true);
  };
  const openLink = () => {
    // console.log(address);
    if (address.link) {
      const instagramProfile = `https://www.instagram.com/pjf1822/?hl=en`;

      Linking.canOpenURL(instagramProfile).then((supported) => {
        if (supported) {
          Linking.openURL(instagramProfile);
        } else {
          console.error("Instagram app is not installed.");
        }
      });
    }
  };

  return (
    <PointAnnotation
      ref={markerRef}
      id={address?._id}
      coordinate={[address?.coordinates[0], address?.coordinates[1]]}
      title={"hey"}
      snippet={"hey"}
      onSelected={onAnnotationSelected}
    >
      <Image
        source={require("../assets/TatMachine.png")}
        onLoad={() => markerRef?.current?.refresh()}
        style={{ width: 60, height: 60 }}
      />
      <Callout
        contentStyle={{ borderRadius: 5, backgroundColor: "white" }}
        style={{ backgroundColor: "white" }}
      >
        <Text>{address?.description}</Text>
        <Image
          style={{ height: 80, width: 80 }}
          source={require("../assets/RAM.png")}
        />
      </Callout>
    </PointAnnotation>
  );
};

export default MapPoint;
