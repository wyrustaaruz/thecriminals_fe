import { Text as DefaultText } from "react-native";
import Colors from "../../constants/Colors";

type DefaultTextType = DefaultText["props"];

interface TextType extends DefaultTextType {
  type?: string;
}

export function Text(props: TextType) {
  const { style, type, ...otherProps } = props;
  const color =
    type === "danger"
      ? Colors.Red
      : type === "button"
      ? Colors.Black
      : Colors.Gold;
  const fontWeight = type === "button" ? "600" : "300";
  return <DefaultText style={[{ color, fontWeight }, style]} {...otherProps} />;
}
