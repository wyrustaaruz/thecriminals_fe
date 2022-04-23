import { ActivityIndicator, Dimensions } from "react-native";
import { View } from "./View";

export const screenWidth = Math.round(Dimensions.get("window").width);
export const screenHeight = Math.round(Dimensions.get("screen").height);

interface LoadingType {
  status: boolean;
}
export const Loading = ({ status }: LoadingType) => {
  if (status) {
    return (
      <View
        style={{
          backgroundColor: "#00000080",
          position: "absolute",
          left: 0,
          top: 0,
          width: screenWidth,
          height: screenHeight,
          alignItems: "center",
          justifyContent: "center",
          elevation: 2,
          zIndex: 2,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return <View />;
  }
};
