import React from "react";
import { View } from "react-native";
import AddOrModifyImageRightsComponent from "../../components/AddOrModifyImageRightsComponent";

const AddOrModifyImageRightsScreen = ({ navigation }) => {

  return (
    <View>
      <AddOrModifyImageRightsComponent navigation={navigation} />
    </View>
  )
};

export default AddOrModifyImageRightsScreen;
