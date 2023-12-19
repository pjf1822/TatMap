import { Formik } from "formik";
import React, { useRef } from "react";
import { View, asyncStorage } from "react-native";
import AddressSearchForm from "./AddressSearchForm";
import { createAddress } from "../api";
import { showToast } from "../helpers";
import Toast from "react-native-root-toast";
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
      onSubmit={async (values, actions) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        if (!values.description || !values.link || !values.newCoords.length) {
          showToast(
            "Please fill out all of the fields",
            false,
            Toast.positions.TOP
          );
          return;
        }
        if (values.link && !urlRegex.test(values.link)) {
          showToast("Link needs to be a URL", false, Toast.positions.TOP);
          return;
        }

        try {
          const response = await createAddress({
            description: values?.description,
            link: values?.link,
            coordinates: {
              theLng: String(values?.newCoords[0]),
              theLat: String(values?.newCoords[1]),
            },
          });

          getAllAddresses();
          autocompleteRef.current?.setAddressText("");
          actions.resetForm({
            values: {
              description: "",
              link: "",
              newCoords: [],
            },
          });
          setCoordinates(null);
          showToast("Shop added!", true, Toast.positions.TOP);
        } catch (error) {
          showToast("Something went wrong!", false, Toast.positions.TOP);

          console.error("Error creating address:", error);
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
