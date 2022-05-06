import { TextInput as DefaultTextInput } from "react-native";

export type TextInputProps = DefaultTextInput["props"];

export function TextInput(props: TextInputProps) {
  const { style, ...otherProps } = props;
  const color = "#C0B184";
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
