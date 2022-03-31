import React, {useEffect, useState} from "react";
import {FlatList, Text, View, StyleSheet} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {useSelector} from "react-redux";
import EmptyState from "../../../components/EmptyState";
import MyDonationsComponent from "../../../components/MyDonationsComponent";
import {colors} from "../../../constants/palette";

const MyDonationsScreen = () => {
  const [donations, setDonations] = useState();
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    fetch("https://blood-center.tk/api/get_user_donations", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "bearer " + user.userProfile.token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDonations(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return donations ? (
    <ScrollView>
      <View>
        <View style={styles.headContainer}>
          <View style={styles.left}>
            <View>
              <Text style={styles.header}>Donations</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={styles.header}>{donations.length}</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={donations}
            keyExtractor={(item) => String(item.donation_id)}
            renderItem={({item, index}) => {
              return (
                <MyDonationsComponent
                  date={item.created_at.substr(0, 10)}
                  city={item.city}
                  hospital={item.hospital}
                  firstName={item.first_name}
                  lastName={item.last_name}
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
  headContainer: {
    backgroundColor: colors.background,
    margin: "5%",
    marginBottom: "1%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    padding: "2%",
    paddingLeft: "10%",
  },
  right: {
    paddingRight: "10%",
  },
  left: {},
});

export default MyDonationsScreen;
