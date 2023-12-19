import { Formik } from "formik";
import React, { useRef } from "react";
import { View, asyncStorage } from "react-native";
import AddressSearchForm from "./AddressSearchForm";
import { handleSubmit } from "../helpers";
import MyButton from "./MyButton";
import MyTextInput from "./MyTextInput";

const DescriptionForm = ({ getAllAddresses, setCoordinates, setZoom }) => {
  const autocompleteRef = useRef(null);

  return (
    <Formik
      initialValues={{
        description: "",
        link: "",
        newCoords: [],
      }}
      onSubmit={(values, actions) =>
        handleSubmit(
          values,
          actions,
          getAllAddresses,
          autocompleteRef,
          setCoordinates,
          setZoom
        )
      }
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <View>
            <AddressSearchForm
              handleChange={handleChange}
              autocompleteRef={autocompleteRef}
              setCoordinates={setCoordinates}
              setZoom={setZoom}
            />
          </View>
          <View>
            <MyTextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values?.description}
              placeholder="Description"
            />
            <MyTextInput
              onChangeText={handleChange("link")}
              onBlur={handleBlur("link")}
              value={values?.link}
              placeholder="Shop Link"
            />

            <MyButton onPress={handleSubmit} text="Submit" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default DescriptionForm;
