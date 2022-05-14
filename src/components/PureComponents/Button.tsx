import { TouchableOpacity as DefaultTouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

type DefaultTouchableOpacityType = DefaultTouchableOpacity["props"];

export interface ButtonType extends DefaultTouchableOpacityType {
  type?: string;
}

export function Button(props: ButtonType) {
  const { style, onPress, type } = props;
  return (
    <DefaultTouchableOpacity
      style={[
        style,
        {
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          backgroundColor: Colors.Gold,
          borderColor: type === "danger" ? Colors.Red : Colors.Gold,
        },
      ]}
      onPress={onPress}
    >
      {props.children}
    </DefaultTouchableOpacity>
  );
}
