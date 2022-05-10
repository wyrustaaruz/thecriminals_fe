import { Text as DefaultText } from "react-native";
import Colors from "../../constants/Colors";

export type TextProps = DefaultText["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = Colors.Gold;
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
