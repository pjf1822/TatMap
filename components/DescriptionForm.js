import { Formik } from "formik";
import React, { useRef } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddressSearchForm from "./AddressSearchForm";
import { createAddress } from "../api";
import { showToast } from "../helpers";
import Toast from "react-native-root-toast";
import MyButton from "./MyButton";
import { colors } from "../theme";

const DescriptionForm = ({
  setListOfAddresses,
  listOfAddresses,
  getAllAddresses,
  setCoordinates,
  setZoom,
}) => {
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
          await createAddress({
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
        <View style={styles.formik}>
          <View style={styles.formBottomHalf}>
            <AddressSearchForm
              handleChange={handleChange}
              autocompleteRef={autocompleteRef}
              setCoordinates={setCoordinates}
              setZoom={setZoom}
            />
          </View>
          <View style={styles.formTopHalf}>
            <TextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values?.description}
              style={styles.formTextInput}
              placeholder="Description"
            />
            <TextInput
              onChangeText={handleChange("link")}
              onBlur={handleBlur("link")}
              value={values?.link}
              style={styles.formTextInput}
              placeholder="Shop Link"
            />

            <MyButton onPress={handleSubmit} text="Submit" />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formik: {
    position: "absolute",
    padding: 10,
    width: wp("70%"),
    top: hp("4%"),
    right: wp("0%"),
    display: "flex",
    justifyContent: "space-between",
    zIndex: 99,
    backgroundColor: colors.rose,
  },
  formTextInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default DescriptionForm;
