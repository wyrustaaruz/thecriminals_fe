import { useEffect, useState } from "react";
import { Alert, StyleSheet, SafeAreaView } from "react-native";
import { TouchableOpacity, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { View, Text } from "../../components/PureComponents";
import { RootStackScreenProps } from "../../../types";
import Actions from "../../redux/actions";

export default function Login({
  route,
  navigation,
}: RootStackScreenProps<"Login">) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Mesaj", "Her iki alanda dolu olmalı!", [
        { text: "Tamam", onPress: () => null },
      ]);
    } else {
      dispatch(Actions.authActions.MakeLogin(email, password));
    }
  };
  useEffect(() => {
    const { registeredEmail, registeredPassword } = route.params || {
      registeredEmail: "",
      registeredPassword: "",
    };
    setEmail(registeredEmail);
    setPassword(registeredPassword);
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>The Criminals</Text>
      </View>
      <View style={styles.inputAreaContent}>
        <View>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Email Adresi"
            placeholderTextColor="#C0B184"
            keyboardType="email-address"
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Şifre"
            placeholderTextColor="#C0B184"
            secureTextEntry={true}
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.loginContainer} onPress={handleLogin}>
            <Text style={styles.loginText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lastLine}>
          <TouchableOpacity onPress={() => navigation.push("Signup")}>
            <Text>Kayıt Ol</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ForgetPassword")}>
            <Text>Şifremi unuttum</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  inputAreaContent: { marginHorizontal: 30 },
  loginContainer: { marginVertical: 15, borderWidth: 1 },
  loginText: {
    padding: 10,
    textAlign: "center",
  },
  lastLine: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    color: "#C0B184",
    padding: 10,
    borderWidth: 1,
  },
});
