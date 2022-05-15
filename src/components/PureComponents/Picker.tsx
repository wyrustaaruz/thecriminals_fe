import { StyleSheet, Image } from "react-native";
import { default as DefaultDropDownPicker } from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";

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
      ArrowDownIconComponent={({ style }: any) => (
        <Image source={ICONS.ARROW_DOWN} style={style} />
      )}
      ArrowUpIconComponent={({ style }: any) => (
        <Image source={ICONS.ARROW_UP} style={style} />
      )}
      TickIconComponent={({ style }: any) => (
        <Image source={ICONS.TICK} style={style} />
      )}
      CloseIconComponent={({ style }: any) => (
        <Image source={ICONS.CLOSE} style={style} />
      )}
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
    borderColor: Colors.Gold,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: Colors.LightGray,
  },
  label: {
    flex: 1,
    color: Colors.Gold,
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    color: "red",
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
    backgroundColor: Colors.LightGray,
    borderRadius: 0,
    borderColor: Colors.Gold,
    borderWidth: 1,
    width: "100%",
    overflow: "hidden",
    zIndex: 1001,
  },
  modalContentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.LightGray,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: Colors.DarkGray,
    color: Colors.Gold,
  },
  listItemLabel: {
    flex: 1,
    color: Colors.Gold,
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
    backgroundColor: Colors.Gold,
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
    color: Colors.Gold,
  },
  selectedItemContainer: {},
  selectedItemLabel: {},
  modalTitle: {
    fontSize: 18,
    color: Colors.Gold,
  },
  placeholder: {
    color: Colors.Gold,
  },
});
const ICONS = {
  ARROW_DOWN: require("../../../assets/images/down_icon.png"),
  ARROW_UP: require("../../../assets/images/up_icon.png"),
  TICK: require("../../../assets/images/check_icon.png"),
  CLOSE: require("../../../assets/images/close_icon.png"),
};
