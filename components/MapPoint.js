import { Image, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Callout, PointAnnotation } from "@rnmapbox/maps";
import Hyperlink from "react-native-hyperlink";

const MapPoint = ({ address }) => {
  const markerRef = useRef(null);
  const [calloutVisible, setCalloutVisible] = useState(false);

  console.log(address, "the address");
  const onAnnotationSelected = (feature) => {
    setCalloutVisible(true);
  };
  return (
    <PointAnnotation
      ref={markerRef}
      id={address._id}
      coordinate={[address.coordinates[0], address.coordinates[1]]}
      title={"hey"}
      snippet={"hey"}
      onSelected={onAnnotationSelected}
    >
      <Image
        source={require("../assets/TatMachine.png")}
        onLoad={() => markerRef.current.refresh()}
        style={{ width: 60, height: 60 }}
      />
      <Callout
        title={`${address.description}`}
        contentStyle={{ borderRadius: 5, backgroundColor: "white" }}
        style={{ backgroundColor: "white" }}
      >
        <Hyperlink linkText={"hey"} linkDefault={true}>
          <Text style={{ fontSize: 15 }}>
            This text will be parsed to check for clickable strings like
            {address.link} and made clickable.
          </Text>
        </Hyperlink>
      </Callout>
    </PointAnnotation>
  );
};

export default MapPoint;
