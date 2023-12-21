import { createContext, useContext, useEffect, useState } from "react";
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

  return (
    <DeviceAddressesContext.Provider
      value={{ deviceAddressIds, setDeviceAddressIds }}
    >
      {children}
    </DeviceAddressesContext.Provider>
  );
};
