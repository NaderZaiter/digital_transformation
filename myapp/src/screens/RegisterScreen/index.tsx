import React, { useRef, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { colors } from "../../constants/palette";
import Toast from "react-native-toast-message";
import { petitions } from "../../constants/petitions";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const register = async () => {
    if (!firstName) {
      Toast.show({
        type: 'error',
        text1: 'El nombre es obligatorio.',
      });
    } else if (!lastName) {
      Toast.show({
        type: 'error',
        text1: 'Los apellidos son obligatorios.',
      });
    } else if (!user) {
      Toast.show({
        type: 'error',
        text1: 'El usuario es obligatorio.',
      });
    } else if (!password) {
      Toast.show({
        type: 'error',
        text1: 'La contraseña es obligatoria.',
      });
    } else if (!confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'La confirmación de la contraseña es obligatoria.',
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Las contraseñas no coinciden.',
      });
    } else if(await addUserToDDBB()){
      Toast.show({
        type: 'success',
        text1: 'El usuario ha sido registrado correctamente.',
      });
      navigateLogin();
    }else{
      Toast.show({
        type: 'error',
        text1: 'El usuario ya existe.',
      });
    }
  };

  const addUserToDDBB = async () => {
    let result = false;
    await fetch(petitions.register_local, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        user: user,
        password: password,
        name: firstName,
        surname: lastName,
        permission: false
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  // const validateEmail = (email) => {
  //   const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  //   return expression.test(String(email).toLowerCase())
  // }

  const navigateLogin = () => {
    setFirstName(null);
    setLastName(null);
    setUser(null);
    setPassword(null);
    setConfirmPassword(null);
    navigation.navigate("LoginScreen");
  };

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  return (
    <ScrollView>
      <View>
        <Toast />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Bienvenido!</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Nombre</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFirstName}
              placeholder={"Nombre"}
            />
          </View>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Apellidos</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLastName}
              placeholder={"Apellidos"}
            />
          </View>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Usuario</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUser}
              placeholder={"Usuario"}
            />
          </View>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              placeholder={"Password"}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Confirm password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setConfirmPassword}
              placeholder={"Confirm password"}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View>
          <View style={styles.bodyContainer}>
            <View>
              <Button title="Sign Up" color={colors.black} onPress={register} />
            </View>
            <View style={styles.registerBtnContainer}>
              <Text>ya tienes cuenta?</Text>
              <TouchableOpacity onPress={navigateLogin}>
                <Text style={styles.signinrBtn}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: "4%",
    marginVertical: "2%",
  },
  textContainer: {
    marginHorizontal: "4%",
    marginTop: "2%",
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 14,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: "7%",
    marginBottom: "5%",
  },
  header: {
    fontSize: 30,
  },
  bodyContainer: {
    margin: 20,
    marginTop: "10%",
  },
  registerBtnContainer: {
    marginTop: "6%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 50,
  },
  signinrBtn: {
    fontSize: 16,
    paddingLeft: 5,
  },
  picker: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
    marginHorizontal: "4%",
  },
});
export default LoginScreen;
