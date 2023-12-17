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
    console.log("try ing to open");
    if (address.link) {
      const instagramProfile = `instagram://user?username=pjf1822`;

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
        <TouchableOpacity
          style={{ height: 80, width: 80, backgroundColor: "yellow" }}
          onPress={() => {
            console.log("TouchableOpacity pressed");
            openLink();
          }}
        >
          <Text>hey</Text>
        </TouchableOpacity>
      </Callout>
    </PointAnnotation>
  );
};

export default MapPoint;
