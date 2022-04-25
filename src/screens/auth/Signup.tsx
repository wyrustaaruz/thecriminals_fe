import { useState, useRef } from "react";
import { Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Loading, MyModal } from "../../components/PureComponents";
import Actions from "../../redux/actions";
import SelectAvatar from "./SelectAvatar";

export default function Signup({ navigation }: any) {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.commonReducers.loading);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [avatarModal, setAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({ name: "", url: "" });

  const ref_input2 = useRef<any>();
  const ref_input3 = useRef<any>();
  const ref_input4 = useRef<any>();

  const handleSignup = () => {
    dispatch(
      Actions.authActions.MakeRegister(
        username,
        email,
        password,
        passwordConfirmation,
        navigation,
        selectedAvatar
      )
    );
  };
  const selectedAvatarFunction = (item: any) => {
    setSelectedAvatar(item);
    setAvatarModal(false);
  };
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: "#464646",
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
          <Text style={styles.infoText}>Kayıt Ol</Text>
          <TextInput
            style={styles.input}
            value={username}
            autoCapitalize="none"
            placeholder="Kullanıcı Adı"
            placeholderTextColor="#C0B184"
            onChangeText={(value) => {
              setUsername(value);
            }}
            returnKeyType="next"
            onSubmitEditing={(): any => ref_input2.current.focus()}
          />
          <TextInput
            ref={ref_input2}
            style={styles.input}
            value={email}
            autoCapitalize="none"
            placeholder="Email Adresi"
            placeholderTextColor="#C0B184"
            keyboardType="email-address"
            onChangeText={(value) => {
              setEmail(value);
            }}
            returnKeyType="next"
            onSubmitEditing={(): any => ref_input3.current.focus()}
          />
          <TextInput
            ref={ref_input3}
            style={styles.input}
            value={password}
            placeholder="Şifre"
            placeholderTextColor="#C0B184"
            secureTextEntry={true}
            onChangeText={(value) => {
              setPassword(value);
            }}
            returnKeyType="next"
            onSubmitEditing={(): any => ref_input4.current.focus()}
          />
          <TextInput
            ref={ref_input4}
            style={styles.input}
            value={passwordConfirmation}
            placeholder="Şifre Tekrar"
            placeholderTextColor="#C0B184"
            secureTextEntry={true}
            onChangeText={(value) => {
              setPasswordConfirmation(value);
            }}
          />
          {selectedAvatar.url ? (
            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 10 }}
              onPress={() => setAvatarModal(true)}
            >
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: selectedAvatar.url,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.signupContainer}
              onPress={() => setAvatarModal(true)}
            >
              <Text style={styles.signupText}>Avatar Seç</Text>
            </TouchableOpacity>
          )}
          <MyModal
            visible={avatarModal}
            onRequestClose={() => setAvatarModal(false)}
          >
            <SelectAvatar
              selectedAvatarFunction={(item: any) =>
                selectedAvatarFunction(item)
              }
              selected={selectedAvatar}
            />
          </MyModal>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signupContainer}
            onPress={handleSignup}
          >
            <Text style={styles.signupText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  tinyLogo: {
    width: 70,
    height: 70,
  },
});
