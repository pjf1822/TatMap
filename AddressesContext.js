import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DeviceAddressesContext = createContext();

export const useDeviceAddresses = () => {
  const context = useContext(DeviceAddressesContext);
  if (!context) {
    throw new Error(
      "useDeviceAddresses must be used within a DeviceAddressesProvider"
    );
  }
  return context;
};

export const DeviceAddressesProvider = ({ children }) => {
  const [deviceAddressIds, setDeviceAddressIds] = useState([]);

  useEffect(() => {
    // console.log("deviceAddressIds changed context", deviceAddressIds.length);
    // You can add any additional logic you need here
  }, [deviceAddressIds]);
  return (
    <DeviceAddressesContext.Provider
      value={{ deviceAddressIds, setDeviceAddressIds }}
    >
      {children}
    </DeviceAddressesContext.Provider>
  );
};
