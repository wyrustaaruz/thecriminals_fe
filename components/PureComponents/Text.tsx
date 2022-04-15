import { Text as DefaultText } from "react-native";

export type TextProps = DefaultText["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = "#C0B184";
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
