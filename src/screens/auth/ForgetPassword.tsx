import { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity, TextInput } from "react-native";
import { View, Text, Loading } from "../../components/PureComponents";
import { RootStackScreenProps } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../../redux/actions";
import Colors from "../../constants/Colors";

export default function ForgetPassword({
  navigation,
}: RootStackScreenProps<"ForgetPassword">) {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.commonReducers.loading);

  const [email, setEmail] = useState("");
  const handleLForgetPassword = () => {
    if (email === "") {
      Alert.alert("Mesaj", "Email adresi dolu olmalı!", [
        { text: "Tamam", onPress: () => null },
      ]);
    } else {
      dispatch(Actions.authActions.ForgetPass(email, navigation));
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.LightGray,
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <Loading status={loading} />
      <View>
        <Text style={styles.title}>The Criminals</Text>
      </View>
      <View style={styles.inputAreaContent}>
        <View>
          <Text style={styles.infoText}>Şifremi Unuttum</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={email}
            placeholder="Email Adresi"
            placeholderTextColor={Colors.LightGold}
            keyboardType="email-address"
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.forgetPasswordContainer}
            onPress={handleLForgetPassword}
          >
            <Text style={styles.forgetPasswordText}>Şifre Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  infoText: {
    textAlign: "center",
    marginVertical: 20,
  },
  inputAreaContent: { marginHorizontal: 30 },
  forgetPasswordContainer: { marginVertical: 15, borderWidth: 1 },
  forgetPasswordText: {
    padding: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    color: Colors.Gold,
    padding: 10,
    borderWidth: 1,
  },
});
