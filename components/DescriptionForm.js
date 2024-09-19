import { Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { Keyboard, View } from "react-native";
import AddressSearchForm from "./AddressSearchForm";
import { handleSubmit, showToast } from "../helpers";
import MyButton from "./MyButton";
import MyTextInput from "./MyTextInput";
import Toast from "react-native-root-toast";
import { useAddress } from "../AddressContext";

const DescriptionForm = ({ setCoordinates, setZoom }) => {
  const autocompleteRef = useRef(null);
  const { addAddress } = useAddress();
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .?&%=]*)?$/i;

  const isValidURL = (urlString) => {
    return urlPattern.test(urlString);
  };
  return (
    <Formik
      initialValues={{
        description: "",
        link: "",
        newCoords: [],
      }}
      onSubmit={async (values, actions) => {
        // Validation logic

        if (!values.description || !values.link) {
          showToast(
            "Please fill out all of the fields",
            false,
            Toast.positions.TOP
          );
          return;
        }
        if (!values.newCoords.length) {
          showToast(
            "Please choose an address from the dropdown",
            false,
            Toast.positions.TOP
          );
          return;
        }

        if (!isValidURL(values.link)) {
          showToast("Please enter a valid URL", false, Toast.positions.TOP);
          return;
        }

        try {
          const newAddress = await handleSubmit(values);
          addAddress(newAddress);
          setZoom(4);
          setCoordinates(null);
          autocompleteRef.current?.clear();
          autocompleteRef.current.setAddressText("");
          actions.resetForm();
          Keyboard.dismiss();
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
      {({ handleChange, handleBlur, handleSubmit, values }) => {
        return (
          <View style={{ flex: 1, marginBottom: 20 }}>
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
        );
      }}
    </Formik>
  );
};

export default DescriptionForm;
