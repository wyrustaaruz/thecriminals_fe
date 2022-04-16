import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { TouchableOpacity, TextInput } from "react-native";
import { View, Text } from "../../components/PureComponents";
import { RootStackScreenProps } from "../../types";

export default function ForgetPassword({
  navigation,
}: RootStackScreenProps<"ForgetPassword">) {
  const [email, setEmail] = useState("");
  const handleLForgetPassword = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>The Criminals</Text>
      </View>
      <View style={styles.inputAreaContent}>
        <View>
          <Text style={styles.infoText}>Şifremi Unuttum</Text>
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
  forgetPasswordContainer: { marginVertical: 15, borderWidth: 1 },
  forgetPasswordText: {
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
