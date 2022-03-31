import {colors} from "../../constants/palette";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View>
            <Text style={styles.header}>{props.header}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name={"arrow-right"} size={20} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginTop: 2,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2%",
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    padding: "2%",
    paddingLeft: "10%"
  },
  left: {},
  right: {},
  icon: {
    paddingTop: 10,
  },
});

export default ProfileButtonComponent;
