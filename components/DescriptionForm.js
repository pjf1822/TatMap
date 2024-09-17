import { Formik } from "formik";
import React, { useRef } from "react";
import { View } from "react-native";
import AddressSearchForm from "./AddressSearchForm";
import { handleSubmit, showToast } from "../helpers";
import MyButton from "./MyButton";
import MyTextInput from "./MyTextInput";
import Toast from "react-native-root-toast";

const DescriptionForm = ({
  getAllAddresses,
  setCoordinates,
  setZoom,
  setListOfAddresses,
  listOfAddresses,
}) => {
  const autocompleteRef = useRef(null);

  return (
    <Formik
      initialValues={{
        description: "",
        link: "",
        newCoords: [],
      }}
      onSubmit={(values, actions) => {
        // Validation logic
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        if (!values.description || !values.link || !values.newCoords.length) {
          showToast(
            "Please fill out all of the fields",
            false,
            Toast.positions.TOP
          );
          return;
        }

        // if (values.link && !urlRegex.test(values.link)) {
        //   showToast("Link needs to be a URL", false, Toast.positions.TOP);
        //   return;
        // }

        // Call handleSubmit if validation passes
        handleSubmit(
          values,
          actions,
          autocompleteRef,
          setCoordinates,
          setZoom,
          setListOfAddresses,
          listOfAddresses
        );
      }}
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
