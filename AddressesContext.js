import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DeviceAddressesContext = createContext();
// import { MMKV } from "react-native-mmkv";

// export const storage = new MMKV();
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

  // useEffect(() => {
  //   // Load deviceAddressIds from AsyncStorage on component mount
  //   const loadDeviceAddressIds = async () => {
  //     try {
  //       const storedIds = await AsyncStorage.getItem("deviceAddressIds");
  //       if (storedIds) {
  //         setDeviceAddressIds(JSON.parse(storedIds));
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Error loading deviceAddressIds from AsyncStorage:",
  //         error
  //       );
  //     }
  //   };

  //   loadDeviceAddressIds();
  // }, []); // Empty dependency array ensures it only runs once on mount

  const addDeviceAddressId = async (id) => {
    try {
      // Update deviceAddressIds and store in AsyncStorage
      console.log("where are we step 1 ");
      setDeviceAddressIds((prevIds) => [...prevIds, id]);
      await AsyncStorage.setItem(
        "deviceAddressIds",
        JSON.stringify(deviceAddressIds)
      );
    } catch (error) {
      console.error("Error saving deviceAddressIds to AsyncStorage:", error);
    }
  };
  return (
    <DeviceAddressesContext.Provider
      value={{ deviceAddressIds, addDeviceAddressId, setDeviceAddressIds }}
    >
      {children}
    </DeviceAddressesContext.Provider>
  );
};
