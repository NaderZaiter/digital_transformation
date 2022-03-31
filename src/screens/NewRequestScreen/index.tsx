import React from "react";
import { View } from "react-native";
import NewRequestComponent from "../../components/NewRequestComponent";

const NewRequestScreen = ({ navigation }) => {
  
  return (
    <View>
      <NewRequestComponent navigation={navigation}/>
    </View>
  )
};

export default NewRequestScreen;
