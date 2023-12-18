import { Image } from "react-native";
import React, { useRef } from "react";
import { Callout, PointAnnotation } from "@rnmapbox/maps";

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
      onDeselected={() => console.log("deselected")}
    >
      <Image
        source={require("../assets/TatMachine.png")}
        onLoad={() => markerRef?.current?.refresh()}
        style={{ width: 60, height: 60 }}
      />
      {/* <Callout
        contentStyle={{ borderRadius: 5, backgroundColor: "white" }}
        style={{ backgroundColor: "white" }}
      >
        <Text>{address?._id}</Text>
        <Image
          style={{ height: 80, width: 80 }}
          source={require("../assets/RAM.png")}
        />
      </Callout> */}
    </PointAnnotation>
  );
};

export default MapPoint;
