import { View, Text } from "react-native";
import React, { useRef } from "react";
import { PointAnnotation } from "@rnmapbox/maps";

const TemporaryPoint = ({ coordinates }) => {
  const markerRef = useRef(null);

  return (
    <>
      {coordinates && (
        <PointAnnotation
          ref={markerRef}
          id={"1"}
          coordinate={coordinates}
          title={"hey"}
          snippet={"hey"}
        >
          <View
            style={{ height: 20, width: 20, backgroundColor: "yellow" }}
          ></View>
        </PointAnnotation>
      )}
    </>
  );
};

export default TemporaryPoint;
