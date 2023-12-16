import { Formik } from "formik";
import React, { useRef } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddressSearchForm from "./AddressSearchForm";
import { createAddress } from "../api";

const DescriptionForm = ({
  setListOfAddresses,
  listOfAddresses,
  getAllAddresses,
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
        } catch (error) {
          console.error("Error creating address:", error);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.formik}>
          <View style={styles.formBottomHalf}>
            <AddressSearchForm
              setListOfAddresses={setListOfAddresses}
              listOfAddresses={listOfAddresses}
              handleChange={handleChange}
              autocompleteRef={autocompleteRef}
            />
          </View>
          <View style={styles.formTopHalf}>
            <TextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values?.description}
            />
            <TextInput
              onChangeText={handleChange("link")}
              onBlur={handleBlur("link")}
              value={values?.link}
            />

            <Button onPress={handleSubmit} title="Submit" />
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
    zIndex: 99,
    backgroundColor: "blue",
  },
  formTopHalf: {},
  formBottomHalf: {},
});

export default DescriptionForm;
