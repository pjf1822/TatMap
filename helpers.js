import Toast from "react-native-root-toast";

export const showToast = (toastMessage, success, position) => {
  let toast = Toast.show(toastMessage, {
    duration: Toast.durations.LONG,
    position: position,
    backgroundColor: success === true ? "green" : "red",
    textColor: "white",
    opacity: 1,
  });
};
