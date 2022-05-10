import { TouchableOpacity as DefaultTouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

export type TouchableOpacityProps = DefaultTouchableOpacity["props"];

export function Button(props: TouchableOpacityProps) {
  const { style, onPress } = props;
  return (
    <DefaultTouchableOpacity
      style={[
        style,
        {
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          borderColor: Colors.Gold,
        },
      ]}
      onPress={onPress}
    >
      {props.children}
    </DefaultTouchableOpacity>
  );
}
