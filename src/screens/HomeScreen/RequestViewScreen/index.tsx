import React, {useEffect, useState} from "react";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import EmptyState from "../../../components/EmptyState";
import RequestViewComponent from "../../../components/RequestViewComponent";
import {colors} from "../../../constants/palette";

const RequestViewScreen = ({navigation, route}) => {
  const id = route.params.id;
  const [requestData, setRequestData] = useState();
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    fetch("https://blood-center.tk/api/get_request_data", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "bearer " + user.userProfile.token,
      }),
      body: JSON.stringify({request_id: id}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setRequestData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function sendPushNotification(token) {
    try {
      const message = {
        to: token,
        sound: "default",
        title: "Blood Center",
        body: `${user.userProfile.firstName} ${user.userProfile.lastName} is ready to donate!`,
        data: {someData: "goes here"},
      };
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error(error);
    }
  }

  const Submit = (id, firebase_token) => {
    fetch("https://blood-center.tk/api/make_donation", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "bearer " + user.userProfile.token,
      }),
      body: JSON.stringify({blood_request_id: id}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        sendPushNotification(firebase_token);
        navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return requestData ? (
    <View>
      <RequestViewComponent
        unitsCount={requestData[0].left_number_of_units}
        bloodType={requestData[0].type}
        hospital={requestData[0].hospital}
        city={requestData[0].city}
        date={requestData[0].created_at.substr(0, 10)}
        time={requestData[0].created_at.substr(11, 11)}
        expiryDate={requestData[0].expiry_date}
        firstName={requestData[0].first_name}
        lastName={requestData[0].last_name}
      />
      <TouchableOpacity
        onPress={() => Submit(requestData[0].id, requestData[0].firebase_token)}
        style={styles.container}
      >
        <Text style={styles.text}>Donate</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <EmptyState loading={true} icon={"coffee"} />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    marginTop: "70%",
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: colors.white,
  },
});

export default RequestViewScreen;
