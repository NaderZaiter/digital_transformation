import {colors} from "../../constants/palette";
import { Text, View, StyleSheet } from "react-native";
import React, { useState } from "react";

const MyDonationsComponent = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <Text></Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.upperBody}>{props.city}</Text>
          <Text style={styles.lowerBody}>{props.hospital}</Text>
        </View>
      </View>
    </View>
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
  },
  date: {
    color: colors.white,
    fontSize: 14,
    padding: '2%',
    marginRight: '8%'
  },
  bodyContainer: {
    backgroundColor: colors.background,
    flexDirection: "row",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "space-between",
    paddingLeft: 25
  },
  upperBody: {
    color: colors.text,
    fontSize: 20,
    paddingTop: 5,
  },
  lowerBody: {
    color: colors.text,
    fontSize: 18,
    paddingBottom: 8,
  },
  icon: {
    paddingTop: 29,
    paddingRight: 25,
  },
});

export default MyDonationsComponent;
