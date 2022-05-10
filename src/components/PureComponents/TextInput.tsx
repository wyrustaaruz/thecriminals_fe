import { TextInput as DefaultTextInput } from "react-native";
import Colors from "../../constants/Colors";

export type TextInputProps = DefaultTextInput["props"];

export function TextInput(props: TextInputProps) {
  const { style, ...otherProps } = props;
  const color = Colors.Gold;
  return (
    <DefaultTextInput
      style={[
        { color, borderWidth: 1, borderRadius: 8, borderColor: color },
        style,
      ]}
      {...otherProps}
    />
  );
}
