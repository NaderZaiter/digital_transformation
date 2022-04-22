import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../../constants/palette";
import { Avatar, Switch } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileButtonComponent from "../../../components/ProfileButtonComponent";
import { store } from "../../../redux/store";
import { deleteUser } from "../../../redux/slices/userSlice";
import _ from "lodash";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state?.user);

  const navigateEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };

  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [status, setStatus] = useState(null);
  const [value, setValue] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setProfileValues(user.userProfile.is_available)
  }, [user.userProfile]);

  const setProfileValues = (value) => {
    setId(user.userProfile.id);
    setFirstName(_.capitalize(user.userProfile.firstName));
    setLastName(_.capitalize(user.userProfile.lastName));
    setImage(user.userProfile.profile_picture_url);
    setValue(value);
    setStatus(value? "Available": "Unavailable");
  }

  const changeStatus = () => {
    setValue(!value);
    if (!value) {
      setStatus("Available");
    } else {
      setStatus("Unavailable");
    }
  };

  const Logout = () => {
    store.dispatch(deleteUser());
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.headContainer}>
          <View style={styles.avatar}>
            <Avatar
              activeOpacity={0.2}
              containerStyle={{ backgroundColor: colors.text }}
              rounded
              size="large"
              source={
                image ? { uri: image } : require('./../../../../assets/default_photo.jpg')
              }
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.status}>{status}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.container}>
            <View>
              <View>
                <Text style={styles.header}>Disponibilidad</Text>
              </View>
            </View>
            <View>
              <Switch
                color="#2089dc"
                value={value}
                onValueChange={() => changeStatus()}
              />
            </View>
          </View>
          <ProfileButtonComponent
            header="Edit profile"
            onPress={navigateEditProfile}
          />
        </View>
        <TouchableOpacity onPress={Logout}>
          <View style={styles.logoutContainer}>
            <View>
              <View>
                <Text style={styles.logout}>Log out</Text>
              </View>
            </View>
            <View>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name={"logout"}
                  size={25}
                  color={colors.white}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    marginLeft: "-9%",
    marginTop: "2%",
  },
  nameContainer: {
    marginTop: "18%",
    marginRight: "25%",
    marginLeft: '4%'
  },
  body: {
    marginTop: "15%",
  },
  name: {
    fontSize: 25,
  },
  status: {
    fontSize: 14,
  },
  container: {
    backgroundColor: colors.background,
    marginTop: 2,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2%",
    borderRadius: 10,
    height: '5rem',
    alignItems: 'center'
  },
  logoutContainer: {
    backgroundColor: colors.red,
    marginTop: "21%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2%",
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    paddingTop: "4%",
    paddingLeft: "11%",
    width: '10rem'
  },
  logout: {
    fontSize: 18,
    padding: "2%",
    paddingLeft: "10%",
    color: colors.white,
  },
  icon: {
    paddingTop: "25%",
  },
});
export default ProfileScreen;
