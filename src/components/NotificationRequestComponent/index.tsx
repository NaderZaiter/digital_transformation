import {colors} from "../../constants/palette";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NotificationRequestComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
    <View style={styles.container}>
        <View style={styles.left}>
          <View>
            <Text style={styles.header}>{props.header}</Text>
          </View>
          <View>
            <Text style={styles.body}>{props.body}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.time}>{props.time}</Text>
          <View style={styles.icon}>
            <MaterialCommunityIcons name={"arrow-right"} size={20} color={colors.black}/>
          </View>
        </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    marginTop: 7,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black
  },
  body: {
    fontSize: 16,
    paddingTop: 5,
    color: colors.black
  },
  left: {},
  right: {},
  time: {
    paddingRight: 20,
    color: colors.black
  },
  icon: {
    paddingTop: 10
  },
});

export default NotificationRequestComponent;
