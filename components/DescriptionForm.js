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

  const normalizeURL = (urlString) => {
    // Remove leading/trailing whitespace
    urlString = urlString.trim();

    // Check if the URL is a basic domain or lacks a protocol
    if (/^[a-zA-Z0-9.-]+$/.test(urlString)) {
      // If the URL is just a domain, prepend the protocol
      urlString = "https://" + urlString;
    }

    // Regular expression to validate URL format
    const urlPattern = /^(https?:\/\/)?([a-z0-9.-]+)([^\s]*)$/i;

    // Check if the URL matches the pattern
    if (!urlPattern.test(urlString)) {
      console.error("Invalid URL:", urlString);
      return null;
    }

    // Normalize URL by ensuring lowercase domain and removing 'www.'
    const normalizedUrl = urlString
      .toLowerCase() // Convert the entire URL to lowercase
      .replace(/^(https?:\/\/)?(www\.)?/i, "https://") // Ensure 'https://' and remove 'www.'
      .replace(/\/$/, ""); // Remove trailing slash if present

    return normalizedUrl;
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

        const normalizedLink = normalizeURL(values.link);

        values.link = normalizedLink;

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
