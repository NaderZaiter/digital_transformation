import { colors } from "../../constants/palette";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";
import notification from "../../helpers/toast";
import { petitions } from "../../constants/petitions";

const ModifyBudgetComponent = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const [budgets, setBudgets] = useState([]);

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }


  

    

  return (
    <ScrollView>
      
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

export default ModifyBudgetComponent;
