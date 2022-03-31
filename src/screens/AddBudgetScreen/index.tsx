import React from "react";
import { View } from "react-native";
import NewRequestComponent from "../../components/AddBudgetComponent";

const AddBudgetScreen = ({ navigation }) => {

  return (
    <View>
      <NewRequestComponent navigation={navigation} />
    </View>
  )
};

export default AddBudgetScreen;
