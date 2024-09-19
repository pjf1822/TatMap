// AddressContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  where,
  documentId,
  query,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);

  const addAddress = (newAddress) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      const storedData = await AsyncStorage.getItem("device_addresses");
      const ids = JSON.parse(storedData) || [];
      // const ids = [];

      // console.log(ids, "the ids on mount from the async storage");
      if (ids.length === 0 || ids === [null]) {
        return;
      }

      const addressesQuery = query(
        collection(db, "addresses"),
        where(documentId(), "in", ids) // Filter documents by IDs
      );

      const querySnapshot = await getDocs(addressesQuery);
      const addresses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(addresses, "teh addresses");
      setAddresses(addresses);
    };

    fetchAddresses();
  }, []);

  const deleteAddress = async (addressToDelete) => {
    await deleteDoc(doc(db, "addresses", addressToDelete.id));

    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== addressToDelete.id)
    );
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, deleteAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
