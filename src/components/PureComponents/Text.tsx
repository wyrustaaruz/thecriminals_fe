import { Text as DefaultText } from "react-native";
import Colors from "../../constants/Colors";

type DefaultTextType = DefaultText["props"];

interface TextType extends DefaultTextType {
  type?: string;
}

export function Text(props: TextType) {
  const { style, type, ...otherProps } = props;
  const color = type === "danger" ? Colors.Red : Colors.Gold;
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
