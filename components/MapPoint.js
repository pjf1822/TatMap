import { Image } from "react-native";
import React, { useRef } from "react";
import { PointAnnotation } from "@rnmapbox/maps";

const MapPoint = ({ address, setSelectedId }) => {
  const markerRef = useRef(null);

  const onAnnotationSelected = (id) => {
    setSelectedId(id);
  };

  return (
    <PointAnnotation
      ref={markerRef}
      id={address?._id}
      coordinate={[address?.coordinates[0], address?.coordinates[1]]}
      title={"hey"}
      snippet={"hey"}
      onSelected={() => onAnnotationSelected(address._id)}
      onDeselected={() => setSelectedId("")}
    >
      <Image
        source={require("../assets/TatMachine.png")}
        onLoad={() => markerRef?.current?.refresh()}
        style={{ width: 60, height: 60 }}
      />
    </PointAnnotation>
  );
};

export default MapPoint;
