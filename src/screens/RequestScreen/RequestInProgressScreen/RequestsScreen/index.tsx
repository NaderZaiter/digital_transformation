import React, {useEffect, useState} from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import {useSelector} from "react-redux";
import EmptyState from "../../../../components/EmptyState";
import {colors} from "../../../../constants/palette";
import {Divider} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RequestsScreen = ({navigation, route}) => {
  const user = useSelector((state) => state?.user);
  const id = route.params.id;
  const [requests, setRequests] = useState();
  const acceptBody = `${user.userProfile.firstName} ${user.userProfile.lastName} has accepted your donation request!`;
  const declinetBody = `${user.userProfile.firstName} ${user.userProfile.lastName} has declined your donation request. The blood request seems to be fulfilled`;

  useEffect(() => {
    fetch("https://blood-center.tk/api/get_request_donations", {
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
        setRequests(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const RequestComponent = (props) => {
    const accept = (user_id, firebase_token) => {
      fetch("https://blood-center.tk/api/accept_donation_request", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "bearer " + user.userProfile.token,
        }),
        body: JSON.stringify({
          blood_request_id: id,
          user_id: user_id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          const newRequests = requests.filter(
            (requests) => requests.user_id !== props.user_id
          );
          setRequests(newRequests);
          sendPushNotification(firebase_token, acceptBody);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const decline = (user_id, firebase_token) => {
      fetch("https://blood-center.tk/api/decline_donation_request", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "bearer " + user.userProfile.token,
        }),
        body: JSON.stringify({
          blood_request_id: id,
          user_id: user_id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          const newRequests = requests.filter(
            (requests) => requests.user_id !== props.user_id
          );
          setRequests(newRequests);
          sendPushNotification(firebase_token, declinetBody);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const viewListItem = (user_id) => {
      navigation.navigate("HealthRecordScreen", {user_id: user_id});
    };

    async function sendPushNotification(token, body) {
      try {
        const message = {
          to: token,
          sound: "default",
          title: "Blood Center",
          body: body,
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

    return (
      <View style={styles.cardContainer}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{props.bloodType}</Text>
            <Text style={styles.date}>{props.date}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => viewListItem(props.user_id)}>
            <View style={styles.bodyContainer}>
              <View>
                <Text style={styles.name}>
                  {props.firstName} {props.lastName}
                </Text>
              </View>
              <View style={styles.icon}>
                <MaterialCommunityIcons name={"arrow-right"} size={25} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Divider
            style={styles.divider}
            color={colors.text_dark}
            insetType="left"
            subHeaderStyle={{}}
            width={1}
            orientation="horizontal"
          />
        </View>
        <View style={styles.buttons}>
          <View style={styles.decline}>
            <Button
              title="Decline"
              color={colors.red}
              onPress={() => decline(props.user_id, props.firebase_token)}
            />
          </View>
          <View style={styles.accept}>
            <Button
              title="Accept"
              color={colors.green}
              onPress={() => accept(props.user_id, props.firebase_token)}
            />
          </View>
        </View>
      </View>
    );
  };

  const closeRequest = (id) => {
    fetch("https://blood-center.tk/api/close_request", {
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
        setRequests(responseJson);
        navigation.navigate("InProgressScreen", {request_id: id});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return requests ? (
    <ScrollView>
      <View>
        <View>
          <TouchableOpacity onPress={() => closeRequest(id)}>
            <View style={styles.closeContainer}>
              <Text style={styles.close}>Close request</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={requests}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => {
              return (
                <RequestComponent
                  bloodType={item.type}
                  date={item.created_at.substr(0, 10)}
                  firstName={item.first_name}
                  lastName={item.last_name}
                  user_id={item.user_id}
                  firebase_token={item.firebase_token}
                />
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  ) : (
    <EmptyState loading={true} icon={"coffee"} />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: "center",
  },
  header: {
    color: colors.white,
    paddingLeft: 27,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
  },
  date: {
    color: colors.white,
    paddingRight: 27,
    fontSize: 17,
  },
  bodyContainer: {
    backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    paddingTop: 15,
    paddingRight: 25,
  },
  name: {
    color: colors.text,
    fontSize: 20,
    paddingLeft: 27,
    paddingTop: 12,
    paddingBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.background,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  decline: {
    fontSize: 20,
    paddingLeft: "15%",
    borderRadius: 8,
  },
  accept: {
    fontSize: 20,
    paddingRight: "15%",
  },
  divider: {
    width: "100%",
    color: colors.black,
  },
  closeContainer: {
    backgroundColor: colors.red,
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
  close: {
    fontSize: 20,
    color: colors.white,
  },
});

export default RequestsScreen;
