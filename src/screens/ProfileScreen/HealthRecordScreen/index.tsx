import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {useSelector} from "react-redux";
import EmptyState from "../../../components/EmptyState";
import {colors} from "../../../constants/palette";
import {Avatar} from "react-native-elements";
import HealthRecordComponent from "../../../components/HealthRecordComponent";

const HealthRecordScreen = ({navigation, route}) => {
  const [userData, setUserData] = useState();
  const user_id = route.params.user_id;
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    fetch("https://blood-center.tk/api/visit_profile", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "bearer " + user.userProfile.token,
      }),
      body: JSON.stringify({user_id: user_id}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.length) {
          setUserData(responseJson);
        } else {
          alert('Please go to edit profile and fill your health record')
          navigation.goBack()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return userData ? (
      <View>
        <View style={styles.headContainer}>
          <View style={styles.avatar}>
            <Avatar
              activeOpacity={0.2}
              avatarStyle={{}}
              containerStyle={{backgroundColor: colors.text}}
              iconStyle={{}}
              imageProps={{}}
              overlayContainerStyle={{}}
              placeholderStyle={{}}
              rounded
              size="large"
              source={
                userData[0].profile_picture_url
                ? {uri: userData[0].profile_picture_url }
                : {
                    uri: "https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg",
                  }}
              titleStyle={{}}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {userData[0].first_name} {userData[0].last_name}
            </Text>
            <Text style={styles.status}>
              {userData[0].is_available ? "Available" : "Unavailable"}
            </Text>
          </View>
        </View>
        <HealthRecordComponent header={"Blood type"} value={userData[0].type} />
        <HealthRecordComponent header={"City"} value={userData[0].name} />
        <HealthRecordComponent header={"Date of birth"} value={userData[0].date_of_birth} />
        <HealthRecordComponent
          header={"Last donation date"}
          value={userData[0].last_donation ? userData[0].last_donation : "-"}
        />
        <HealthRecordComponent
          header={"Smoker"}
          value={userData[0].is_smoker ? "Yes" : "No"}
        />
        <HealthRecordComponent
          header={"Have tattoo"}
          value={userData[0].have_tattoo ? "Yes" : "No"}
        />
      </View>
  ) : (
    <EmptyState loading={true} icon={"coffee"} />
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
  },
  nameContainer: {
    marginTop: "18%",
    marginRight: "25%",
    marginBottom: "20%",
  },
  name: {
    fontSize: 25,
  },
  status: {
    fontSize: 14,
  },
});

export default HealthRecordScreen;
