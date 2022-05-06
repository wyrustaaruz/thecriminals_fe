import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, TextInput, Picker } from "./PureComponents";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../redux/actions";

export const BankComponent = () => {
  const dispatch = useDispatch();
  const [money, setMoney] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("in");
  const [items, setItems] = useState([
    { label: "Para Yatır", value: "in" },
    { label: "Para Çek", value: "out" },
  ]);
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const transactionStatus =
    useSelector((state: any) => state.homepageReducers.transactionStatus) || {};
  const doBankAction = async () => {
    await dispatch(Actions.homepageActions.BankAction(money, value));
    setMoney("");
  };
  useEffect(() => {
    dispatch(Actions.homepageActions.GetHeader());
  }, [transactionStatus]);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.centeredText}>
        CriminalCity nin en güvenilir bankasına hoşgeldiniz. Bankaya paranızı
        yatırarak hem faiz alabilir hemde güvende tutabilirsiniz.
        {"\n"}
        {"\n"}
        52 günlük yatırımınızda %2 kazanç sağlayacaksınız
        {"\n"}
        {"\n"}
        Kullanılabilir bakiye: {characterInfo.bank_cash}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Picker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <TextInput
          style={{ marginLeft: 2, paddingLeft: 10, flex: 1, width: "100%" }}
          value={money}
          onChangeText={(value: any) => setMoney(value)}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 50,
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          borderColor: "#C0B184",
          zIndex: -1,
        }}
        onPress={() => doBankAction()}
      >
        <Text style={{ textAlign: "center", justifyContent: "center" }}>
          Para {value === "in" ? "Yatır" : "Çek"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#464646",
    padding: 20,
  },
  centeredText: {
    textAlign: "center",
  },
});
