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

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const [firstName, setFirstName] = useState(user.userProfile.firstName);
  const [lastName, setLastName] = useState(user.userProfile.lastName);
  const [dateOfBirth, setDdateOfBirth] = useState(null);
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

  const Submit = () => {
    if (!firstName) {
      notification.danger({message: 'El nombre es obligatorio', useNativeToast: true, duration: 2000});
    } else if (!lastName) {
      notification.danger({message: 'Los apellidos son obligatorios', useNativeToast: true, duration: 2000});
    }
    else if (!dateOfBirth) {
      notification.danger({message: 'La fecha de nacimiento es obligatoria', useNativeToast: true, duration: 2000});
    } else {
      store.dispatch(
        updateUserProfile({
          userProfile: {
            firstName: firstName,
            lastName: lastName,
          },
        })
      );
      navigation.goBack();
      notification.success({message: 'Perfil editado correctamente', useNativeToast: true, duration: 2000});
    }
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
              source={{ uri: image }}
              titleStyle={{}}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Foto de perfil</Text>
            <Text style={styles.status}>Pincha para editar</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Nombre</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            placeholder={user.userProfile.firstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Apellidos</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            placeholder={user.userProfile.lastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Fecha de nacimiento</Text>
          <DatePicker
            showIcon={false}
            androidMode="spinner"
            style={{
              width: "100%",
            }}
            date={dateOfBirth}
            mode="date"
            placeholder="Select date"
            format="YYYY-MM-DD"
            confirmBtnText="Chọn"
            cancelBtnText="Hủy"
            customStyles={{
              dateInput: {
                paddingRight: "74%",
                backgroundColor: colors.background,
                borderWidth: 1,
                borderColor: colors.white,
              },
            }}
            onDateChange={(dateOfBirth) => {
              setDdateOfBirth(dateOfBirth);
            }}
          />
        </View>
        <TouchableOpacity onPress={Submit}>
          <View style={styles.logoutContainer}>
            <Text style={styles.logout}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginLeft: "10%",
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
  logoutContainer: {
    backgroundColor: colors.green,
    marginTop: "20%",
    padding: 20,
    alignItems: "center",
  },
  logout: {
    fontSize: 24,
    color: colors.white,
  },
});

export default EditProfileScreen;
