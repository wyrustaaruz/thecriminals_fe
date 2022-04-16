import { useState, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { TouchableOpacity, TextInput } from "react-native";
import { View, Text } from "../../components/PureComponents";
import { AuthContext } from "../../navigation";

export default function Signup() {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLSignup = () => {
    console.log("email", email, "password", password);
    signUp(email, password);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>The Criminals</Text>
      </View>
      <View style={styles.inputAreaContent}>
        <View>
          <Text style={styles.infoText}>Kayıt Ol</Text>
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
          <Text>Avatar Seç</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signupContainer}
            onPress={handleLSignup}
          >
            <Text style={styles.signupText}>Kayıt Ol</Text>
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
  infoText: {
    textAlign: "center",
    marginVertical: 20,
  },
  inputAreaContent: { marginHorizontal: 30 },
  signupContainer: { marginVertical: 15, borderWidth: 1 },
  signupText: {
    padding: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    color: "#C0B184",
    padding: 10,
    borderWidth: 1,
  },
});
