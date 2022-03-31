import React from "react";
import { View } from "react-native";
import ModifyBudgetComponent from "../../components/ModifyBudgetComponent";

const ModifyBudgetScreen = ({ navigation }) => {

  return (
    <View>
      <ModifyBudgetComponent navigation={navigation} />
    </View>
  )
};

export default ModifyBudgetScreen;
