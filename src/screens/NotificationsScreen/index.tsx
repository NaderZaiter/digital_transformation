import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {useSelector} from "react-redux";
import {ScrollView} from "react-native-gesture-handler";

const NotificationsScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState();
  const user = useSelector((state) => state?.user);

  const getNotifications = () => {
    
  };
  useEffect(() => {
    getNotifications();
  }, []);

  const navigateRequestView = (blood_request_id) => {
    navigation.navigate("RequestViewScreen", {id: blood_request_id});
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getNotifications();
    setRefreshing(false);
  };
  
  return (
    <View>
      <ScrollView>
        <Text>No tienes recordatorios</Text>
      </ScrollView>
    </View>
  )
};

export default NotificationsScreen;
