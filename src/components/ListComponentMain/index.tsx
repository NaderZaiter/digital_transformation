import {colors} from "../../constants/palette";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ListComponentMain = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{props.bloodType}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.upperBody}>{props.city}</Text>
          {props.unitsCount == 1 ? (
            <Text style={styles.lowerBody}> {props.unitsCount} Unit </Text>
          ) : (
            <Text style={styles.lowerBody}> {props.unitsCount} Units </Text>
          )}
        </View>
        <TouchableOpacity onPress={props.onPress}>
          <View>
            <View style={styles.icon}>
              <MaterialCommunityIcons name={"arrow-right"} size={25} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: 10,
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
  date: {
    color: colors.white,
    paddingRight: 27,
    paddingTop: 10,
    paddingBottom: 5,
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
    paddingTop: 5,
  },
  lowerBody: {
    color: colors.text,
    fontSize: 18,
    paddingLeft: 24,
    paddingBottom: 8,
  },
  icon: {
    paddingTop: 29,
    paddingRight: 25,
  },
});

export default ListComponentMain;
