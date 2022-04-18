import React from "react";
import { View } from "react-native";
import AddOrModifyTaskComponent from "../../components/AddOrModifyTaskComponent";

const AddOrModifyTaskScreen = ({ taskParemeter }) => {

  return (
    <View>
      <AddOrModifyTaskComponent taskParemeter={taskParemeter} />
    </View>
  )
};

export default AddOrModifyTaskScreen;
