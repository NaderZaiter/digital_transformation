import {colors} from "../../constants/palette";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Divider, Avatar} from "react-native-elements";
import {useNavigation} from "@react-navigation/core";
import {ScrollView} from "react-native-gesture-handler";

const InProgressRequestComponent = (props) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{props.bloodType}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.upperBody}>
            <View>
              <Text style={styles.city}>{props.city}</Text>
              <Text style={styles.hospital}>{props.hospital}</Text>
            </View>
          </View>
          <View>
              <Text style={styles.units}> Units: {props.unitsCount} </Text>
            </View>
          <Divider
            style={{
              width: "80%",
              marginLeft: 27,
              marginTop: 12,
              marginBottom: 15,
            }}
            color={colors.text_dark}
            insetType="left"
            subHeaderStyle={{}}
            width={1}
            orientation="horizontal"
          />
          <TouchableOpacity onPress={props.onPress}>
            <View style={styles.lowerBody}>
              <Text style={styles.donation}> Donation requests </Text>
              <View style={styles.icon}>
                <MaterialCommunityIcons name={"arrow-right"} size={25} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  header: {
    color: colors.white,
    paddingLeft: 27,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
  },
  name: {
    color: colors.text,
    fontSize: 27,
    paddingLeft: 27,
  },
  date: {
    color: colors.white,
    paddingRight: 27,
    paddingTop: 5,
    paddingBottom: 3,
    fontSize: 14,
  },
  bodyContainer: {
    backgroundColor: colors.background,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "space-between",
  },
  upperBody: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  lowerBody: {
    flexDirection: "row",
    paddingBottom: 15,
    paddingLeft: 13,
  },
  city: {
    color: colors.text,
    fontSize: 20,
    paddingLeft: 27,
    paddingTop: 10,
  },
  hospital: {
    color: colors.text,
    fontSize: 20,
    paddingLeft: 27,
    paddingTop: 5,
  },
  units: {
    color: colors.text,
    fontSize: 18,
    paddingLeft: 24,
    paddingTop: 5,
  },
  donation: {
    color: colors.text,
    fontSize: 18,
    paddingLeft: 12,
  },
  icon: {
    paddingLeft: 70,
  },
  unitsCount: {
    fontSize: 30,
  },
});

export default InProgressRequestComponent;
