import React, {useEffect, useState} from "react";
import {StyleSheet, FlatList, Text, View, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import EmptyState from "../../../../components/EmptyState";
import {colors} from "../../../../constants/palette";
import {Avatar} from "react-native-elements";

const RequestDonatorsScreen = ({navigation, route}) => {
  const user = useSelector((state) => state?.user);
  const [requests, setRequests] = useState();
  const [hospital, setHospital] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://blood-center.tk/api/get_request_donations_fulfilled", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "bearer " + user.userProfile.token,
      }),
      body: JSON.stringify({
        request_id: route.params.id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setRequests(responseJson);
        if (responseJson.length) {
          setHospital(responseJson[0].hospital);
          setBloodType(responseJson[0].type);
        }
        setTimeout(() => setLoading(false), 500);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const visitProfile = (user_id) => {
    navigation.navigate("HealthRecordScreen", {user_id: user_id});
  };

  const Item = (props) => (
    <View>
      <TouchableOpacity onPress={() => visitProfile(props.user_id)}>
        <View style={styles.listContainer}>
          <View style={styles.left}>
            <Avatar
              activeOpacity={0.2}
              avatarStyle={{}}
              containerStyle={{backgroundColor: "#BDBDBD"}}
              icon={{}}
              iconStyle={{}}
              imageProps={{}}
              overlayContainerStyle={{}}
              placeholderStyle={{}}
              rounded
              size="large"
              source={
                props.image
                  ? {uri: props.image}
                  : {
                      uri: "https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg",
                    }
              }
              titleStyle={{}}
            />
            <Text style={styles.name}>
              {props.firstName} {props.lastName}
            </Text>
          </View>
          <View>
            <Text style={styles.date}>{props.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      firstName={item.first_name}
      lastName={item.last_name}
      date={item.created_at.substr(0, 10)}
      id={item.id}
      image={item.profile_picture_url}
      user_id={item.user_id}
    />
  );

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: "black",
        height: 0.3,
      }}
    />
  );

  if (requests) {
    if (requests.length > 1) {
      return (
        <View style={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.header}>{bloodType}</Text>
            </View>
            <View>
              <Text style={styles.hospital}>{hospital}</Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <FlatList
              data={requests}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        </View>
      );
    } else {
      return loading ? (
        <EmptyState
          loading={loading}
          icon={"cloud"}
        />
      ) : (
        <EmptyState
          icon={"cloud"}
          title={"No donators for this request"}
        />
      );
    }
  } else {
    return <EmptyState loading={loading} />;
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    margin: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    color: colors.white,
    paddingLeft: 22,
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 18,
  },
  hospital: {
    color: colors.white,
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 27,
    fontSize: 18,
  },
  bodyContainer: {
    backgroundColor: colors.background,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    paddingLeft: 10,
    paddingTop: 18,
  },
  date: {
    color: colors.text,
    paddingRight: 17,
    paddingTop: 7,
    fontSize: 12,
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
    padding: 10,
  },
  left: {
    flex: 1,
    flexDirection: "row",
  },
});

export default RequestDonatorsScreen;
