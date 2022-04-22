import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../../constants/palette";
import { Avatar, Switch } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-datepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { store } from "../../../redux/store";
import { updateUserProfile } from "../../../redux/slices/userSlice";
import notification from "../../../helpers/toast";
import { petitions } from "../../../constants/petitions";

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const [firstName, setFirstName] = useState(user.userProfile.firstName);
  const [lastName, setLastName] = useState(user.userProfile.lastName);
  const [password, setPassword] = useState(user.userProfile.password);
  const [confirmPassword, setConfirmPassword] = useState(user.userProfile.password);
  const [image, setImage] = useState(user.userProfile.profile_picture_url);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveProfile = async() => {
    if (!firstName) {
      notification.danger({message: 'El nombre es obligatorio', useNativeToast: true, duration: 2000});
    } else if (!lastName) {
      notification.danger({message: 'Los apellidos son obligatorios', useNativeToast: true, duration: 2000});
    }else if (!password) {
      notification.danger({message: 'La contraseña es obligatoria', useNativeToast: true, duration: 2000});
    }else if (password.indexOf(' ') != -1) {
      notification.danger({message: 'La contraseña no puede tener espacios en blanco', useNativeToast: true, duration: 2000});
    } else if (!confirmPassword) {
      notification.danger({message: 'la confirmación de la contraseña es obligatoria', useNativeToast: true, duration: 2000});
    } else if (confirmPassword.indexOf(' ') != -1) {
      notification.danger({message: 'La confirmación de la contraseña no puede tener espacios en blanco', useNativeToast: true, duration: 2000});
    } else if (password !== confirmPassword) {
      notification.danger({message: 'Las contraseñas no coinciden', useNativeToast: true, duration: 2000});
    } else if(await updateUserFromDDBB()){
      notification.success({message: 'Perfil actualizado correctamente', useNativeToast: true, duration: 2000});
      navigation.goBack();
    }else{
      notification.danger({message: 'No se ha podido actualizar el perfil', useNativeToast: true, duration: 2000});
      navigation.goBack();
    }
  };

  const updateUserFromDDBB = async() =>{
    let result = false;
    await fetch(petitions.update_user_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        password: password,
        profilePictureURL: image,
        user: user.userProfile.user
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {
          store.dispatch(
            updateUserProfile({
              userProfile: {
                firstName: firstName,
                lastName: lastName,
                password: password,
                profile_picture_url: image
              },
            })
          );
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.headContainer}>
          <View style={styles.avatar}>
            <Avatar
              activeOpacity={0.2}
              avatarStyle={{}}
              containerStyle={{ backgroundColor: colors.text }}
              iconStyle={{}}
              imageProps={{}}
              onLongPress={pickImage}
              onPress={pickImage}
              overlayContainerStyle={{}}
              placeholderStyle={{}}
              rounded
              size="large"
              source={image ? { uri: image } : require('./../../../../assets/default_photo.jpg')}
              titleStyle={{}}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Foto de perfil</Text>
            <Text style={styles.status}>Pincha sobre la imágen para editar</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Nombre</Text>
          <TextInput
            value={firstName}
            style={styles.input}
            onChangeText={setFirstName}
            placeholder={"Nombre"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Apellidos</Text>
          <TextInput
            value={lastName}
            style={styles.input}
            onChangeText={setLastName}
            placeholder={"Apellidos"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            value={password}
            style={styles.input}
            onChangeText={setPassword}
            placeholder={"Contraseña"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Confirmación de contraseña</Text>
          <TextInput
            value={confirmPassword}
            style={styles.input}
            onChangeText={setConfirmPassword}
            placeholder={"Confirmación de contraseña"}
          />
        </View>
        <TouchableOpacity onPress={saveProfile}>
          <View style={styles.saveProfileContainer}>
            <Text style={styles.saveProfile}>Actualizar perfil</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginLeft: "2%",
    marginTop: "15%",
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "10%",
    marginTop: "2%",
    marginBottom: "15%",
  },
  nameContainer: {
    marginTop: "21%",
    marginRight: "34%",
  },
  name: {
    fontSize: 16,
  },
  status: {
    fontSize: 12,
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
  },
  inputContainer: {
    margin: "2%",
  },
  text: {
    fontSize: 14,
    marginLeft: "3%",
  },
  header: {
    fontSize: 14,
    padding: "2%",
    paddingLeft: "2%",
  },
  container: {
    backgroundColor: colors.background,
    marginTop: 10,
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2%",
    borderColor: colors.black,
  },
  saveProfileContainer: {
    backgroundColor: colors.green,
    marginTop: "20%",
    padding: 20,
    alignItems: "center",
  },
  saveProfile: {
    fontSize: 24,
    color: colors.white,
  },
});

export default EditProfileScreen;
