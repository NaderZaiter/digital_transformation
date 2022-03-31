import {colors} from "../../constants/palette";
import {Text, View, Button, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

const HealthRecordComponent = (props) => {
  return (
    <View>
      <View style={styles.container}>
          <View style={styles.left} >
            <View>
              <Text style={styles.header}>{props.header}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={styles.value}>{props.value}</Text>
          </View>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    margin: '2%',
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginTop: 2
  },
  header: {
    fontSize: 16,
    padding: "2%",
    paddingLeft: "8%",
    fontWeight: 'bold'
  },
  value: {
    fontSize: 16,
    padding: "2%",
    paddingLeft: "8%", 
  },
  right: {
    paddingRight: "10%",
    marginLeft: "5%",
    alignItems: 'center'
  },
  left: {},
  icon: {
    paddingTop: 10,
  },
});

export default HealthRecordComponent;
