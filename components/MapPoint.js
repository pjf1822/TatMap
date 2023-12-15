import { Image } from "react-native";
import React from "react";
import { PointAnnotation } from "@rnmapbox/maps";

const MapPoint = ({ address }) => {
  const onAnnotationSelected = (feature) => {
    console.log("Annotation selected:", feature);
  };
  return (
    <PointAnnotation
      ref={(ref) => (this.markerRef = ref)}
      id={address._id}
      coordinate={[address.coordinates[0], address.coordinates[1]]}
      title={"hey"}
      snippet={"hey"}
      onSelected={onAnnotationSelected}
    >
      <Image
        source={require("../assets/TatMachine.png")}
        onLoad={() => this.markerRef.refresh()}
        style={{ width: 60, height: 60 }}
      />
    </PointAnnotation>
  );
};

export default MapPoint;
