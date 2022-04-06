import React from "react";
import { View } from "react-native";
import AddBudgetComponent from "../../components/AddBudgetComponent";

const AddBudgetScreen = ({ navigation }) => {

  return (
    <View>
      <AddBudgetComponent navigation={navigation} />
    </View>
  )
};

export default AddBudgetScreen;
