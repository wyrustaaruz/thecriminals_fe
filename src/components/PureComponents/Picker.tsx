import { StyleSheet } from "react-native";
import { default as DefaultDropDownPicker } from "react-native-dropdown-picker";
export const Colors = {
  GOLD: "#C0B184",
  LIGHT_GRAY: "#464646",
  DARK_GRAY: "#333333",
};
export function Picker(props: any) {
  const { textStyle, ...otherProps } = props;
  return (
    <DefaultDropDownPicker
      {...styles}
      {...otherProps}
      containerStyle={
        otherProps.containerStyle ? otherProps.containerStyle : styles.container
      }
      placeholder="Seçimini Yap!"
      placeholderStyle={styles.placeholder}
      dropDownContainerStyle={styles.dropDownContainer}
      modalContentContainerStyle={styles.modalContentContainer}
      itemSeparatorStyle={styles.itemSeparator}
      labelStyle={styles.label}
      listItemLabelStyle={styles.listItemLabel}
      listItemContainerStyle={styles.listItemContainer}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    width: "50%",
    zIndex: 1000,
  },
  style: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.GOLD,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  label: {
    flex: 1,
    color: Colors.GOLD,
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  tickIcon: {
    width: 20,
    height: 20,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  listBody: {
    height: "100%",
  },
  listBodyContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  dropDownContainer: {
    position: "absolute",
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 0,
    borderColor: Colors.GOLD,
    borderWidth: 1,
    width: "100%",
    overflow: "hidden",
    zIndex: 1001,
  },
  modalContentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: Colors.DARK_GRAY,
    color: Colors.GOLD,
  },
  listItemLabel: {
    flex: 1,
    color: Colors.GOLD,
    borderColor: "red",
  },
  iconContainer: {
    marginRight: 10,
  },
  arrowIconContainer: {
    marginLeft: 10,
  },
  tickIconContainer: {
    marginLeft: 10,
  },
  closeIconContainer: {
    marginLeft: 10,
  },
  listParentLabel: {},
  listChildLabel: {},
  listParentContainer: {},
  listChildContainer: {
    paddingLeft: 40,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: Colors.GOLD,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  customItemContainer: {},
  customItemLabel: {
    fontStyle: "italic",
  },
  listMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  listMessageText: {
    color: Colors.GOLD,
  },
  selectedItemContainer: {},
  selectedItemLabel: {},
  modalTitle: {
    fontSize: 18,
    color: Colors.GOLD,
  },
  placeholder: {
    color: Colors.GOLD,
  },
});
// const ICONS = {
//     ARROW_DOWN: require('./icons/arrow-down.png'),
//     ARROW_UP: require('./icons/arrow-up.png'),
//     TICK: require('./icons/tick.png'),
//     CLOSE: require('./icons/close.png')
// };
