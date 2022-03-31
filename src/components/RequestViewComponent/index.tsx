import {colors} from "../../constants/palette";
import {Text, View, Button, StyleSheet} from "react-native";
import React from "react";
import {Divider} from "react-native-elements";

const RequestViewComponent = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>{props.bloodType}</Text>
        </View>
        <View>
          <Text style={styles.date}>{props.date}</Text>
          <Text style={styles.time}>{props.time}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <View>
            <Text style={styles.upperBody}>{props.city}</Text>
            <Text style={styles.upperBodyHospital}>{props.hospital}</Text>
          </View>
          <Text style={styles.name}>
            {props.firstName} {props.lastName}
          </Text>
          <Divider
            style={{width: "100%", marginVertical: 15, marginLeft: 27}}
            color={colors.text_dark}
            insetType='middle'
            subHeaderStyle={{}}
            width={1}
            orientation="horizontal"
          />
          <Text style={styles.units}>
            Number of units: {props.unitsCount}
          </Text>
          <Text style={styles.expiry}> Expiry date: {props.expiryDate} </Text>
        </View>
      </View>
    </View>
  );
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
  },
  header: {
    color: colors.white,
    paddingLeft: 27,
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 24,
  },
  date: {
    color: colors.white,
    paddingRight: 27,
    paddingTop: 12,
    paddingBottom: 3,
    fontSize: 14,
  },
  time: {
    color: colors.white,
    paddingRight: 27,
    paddingBottom: 10,
    fontSize: 14,
  },
  bodyContainer: {
    backgroundColor: colors.background,
    flexDirection: "row",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "space-between",
  },
  upperBody: {
    color: colors.text,
    fontSize: 20,
    paddingLeft: 27,
    paddingTop: 20,
  },
  upperBodyHospital: {
    color: colors.text,
    fontSize: 20,
    paddingLeft: 27,
    paddingTop: 10,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    paddingLeft: 27,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  units: {
    color: colors.text,
    fontSize: 18,
    paddingLeft: 29,
    paddingBottom: 8,
  },
  expiry: {
    color: colors.text,
    fontSize: 18,
    paddingLeft: 24,
    paddingBottom: 20,
  },
});

export default RequestViewComponent;
