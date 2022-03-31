import { colors } from "../../constants/palette";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const AddBudgetComponent = ({ navigation }) => {
  const user = useSelector((state) => state?.user);

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }


  const Submit = () => {

  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Introduce la información del presupuesto:</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  question: {
    color: colors.primary_green,
    paddingLeft: 27,
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 20,
  },
  logoutContainer: {
    backgroundColor: colors.green,
    marginTop: "6%",
    padding: 20,
    alignItems: "center",
  },
  logout: {
    fontSize: 24,
    color: colors.white,
  },
  icon: {
    paddingTop: "25%",
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
    marginHorizontal: 15
  },
  inputContainer: {
    marginHorizontal: "4%",
  },
});

export default AddBudgetComponent;
