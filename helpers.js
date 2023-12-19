import Toast from "react-native-root-toast";
import { colors } from "./theme";

export const showToast = (toastMessage, success, position) => {
  let toast = Toast.show(toastMessage, {
    duration: Toast.durations.LONG,
    position: position,
    backgroundColor: success === true ? colors.blue : colors.licorice,
    textColor: colors.tan,
    opacity: 1,
  });
};
