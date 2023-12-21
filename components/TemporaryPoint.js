import { View, Text, Image } from "react-native";
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
          <Image
            style={{ height: 60, aspectRatio: 1 }}
            source={require("../assets/icon2.png")}
            onLoad={() => markerRef?.current?.refresh()}
          />
        </PointAnnotation>
      )}
    </>
  );
};

export default TemporaryPoint;
