import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, StyleSheet, Button } from "react-native";
import { store } from "../../redux/store";
import { updateUserProfile } from "../../redux/slices/userSlice";
import { useNavigation } from "@react-navigation/core";
import { colors } from "../../constants/palette";
import { petitions } from "../../constants/petitions";
import notification from "../../helpers/toast";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  const existUserWithPermissions = async (user, password) => {
    let result = false;
    await fetch(petitions.login_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        user: user.trim(),
        password: password.trim(),
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200 && responseJson.user.permission) {
          result = true;
          saveUserData(responseJson.user)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  const login = async() => {
    if (!user) {
      notification.danger({message: 'El usuario es obligatorio', useNativeToast: true, duration: 2000});
    } else if (!password) {
      notification.danger({message: 'La contraseña es obligatoria', useNativeToast: true, duration: 2000});
    } else if (password.indexOf(' ') != -1) {
      notification.danger({message: 'La contraseña no puede tener espacios en blanco', useNativeToast: true, duration: 2000});
    } else if (await existUserWithPermissions(user, password)) {
      notification.success({message: 'Bienvenido', useNativeToast: true, duration: 2000});
    } else {
      notification.danger({message: 'Usuario sin permisos', useNativeToast: true, duration: 2000});
    }
  };

  const saveUserData = (user) => {
    store.dispatch(
      updateUserProfile({
        userProfile: {
          id: user.id,
          firstName: user.name,
          lastName: user.surname,
          profile_picture_url: user.profile_picture_url ? user.profile_picture_url : "",
          is_available: true,
          permission: user.permission,
          user: user.user,
          password: user.password,
          token: ''
        },
      })
    );
  };

  const navigateRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign in</Text>
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
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            placeholder={"Contraseña"}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View>
        <View style={styles.bodyContainer}>
          <View>
            <Button title="Login" color={colors.black} onPress={login} />
          </View>
          <View style={styles.registerBtnContainer}>
            <Text>Todavía no tienes usuario?</Text>
            <TouchableOpacity onPress={navigateRegister}>
              <Text style={styles.signinrBtn}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: "4%",
    marginVertical: "2%"
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: "40%",
  },
  header: {
    fontSize: 40,
  },
  bodyContainer: {
    margin: 20,
    marginTop: "10%",
  },
  registerBtn: {
    fontSize: 18,
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
});
export default LoginScreen;
