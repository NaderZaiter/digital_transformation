import {colors} from "../../constants/palette";
import {Text, View, Button, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

const NotificationComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <View>
          <Text style={styles.header}>{props.header}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.time}>{props.time}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.body}>{props.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginTop: 7,
    padding: 15,
    justifyContent: "space-between",
  },
  upper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.black,
  },
  body: {
    fontSize: 16,
    paddingTop: 5,
    color: colors.black,
  },
  left: {},
  right: {},
  time: {
    paddingRight: 20,
  },
  icon: {
    paddingTop: 10,
  },
});

export default NotificationComponent;
