import { Formik } from "formik";
import React, { useRef } from "react";
import { View } from "react-native";
import AddressSearchForm from "./AddressSearchForm";
import { handleSubmit, showToast } from "../helpers";
import MyButton from "./MyButton";
import MyTextInput from "./MyTextInput";
import Toast from "react-native-root-toast";
import { useAddress } from "../AddressContext";

const DescriptionForm = ({ setCoordinates, setZoom }) => {
  const autocompleteRef = useRef(null);
  const { addAddress } = useAddress();

  return (
    <Formik
      initialValues={{
        description: "",
        link: "",
        newCoords: [],
      }}
      onSubmit={async (values, actions) => {
        // Validation logic
        if (!values.description || !values.link || !values.newCoords.length) {
          showToast(
            "Please fill out all of the fields",
            false,
            Toast.positions.TOP
          );
          return;
        }

        try {
          const newAddress = await handleSubmit(values);
          addAddress(newAddress);
          setZoom(4);
          setCoordinates(null);
          autocompleteRef.current?.setAddressText("");
          actions.resetForm();
          showToast("Shop added!", true, Toast.positions.TOP);
        } catch (error) {
          console.error("Error in form submission:", error);
          showToast(
            "Failed to submit the address!",
            false,
            Toast.positions.TOP
          );
        }
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
