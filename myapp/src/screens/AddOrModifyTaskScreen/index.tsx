import React from "react";
import { View } from "react-native";
import AddOrModifyTaskComponent from "../../components/AddOrModifyTaskComponent";

const AddOrModifyTaskScreen = ({ navigation }) => {

  return (
    <View>
      <AddOrModifyTaskComponent navigation={navigation} />
    </View>
  )
};

export default AddOrModifyTaskScreen;
