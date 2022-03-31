import React, {useEffect, useRef, useState} from "react";
import {FlatList, Text, View, StyleSheet, RefreshControl, Button} from "react-native";
import {useSelector} from "react-redux";
import EmptyState from "../../../components/EmptyState";
import {colors} from "../../../constants/palette";
import ListComponentMain from "../../../components/ListComponentMain";
import NewRequestBottunComponent from "../../../components/NewRequestBottunComponent";
import {Picker} from "@react-native-picker/picker";
import _ from "lodash";
import {ScrollView, TextInput, TouchableOpacity} from "react-native-gesture-handler";

const HomeScreen = ({navigation}) => {
  const [reminders, setReminders] = useState<string | []>(null);

  const getReminders = () =>{
    setReminders('No tienes ningún recordatorio.')
  }

  useEffect(() => {
    getReminders();
  }, []);

  // const navigateRequestView = (id) => {
  //   navigation.navigate("RequestViewScreen", {id: id});
  // };
  // const navigateNewRequest = () => {
  //   navigation.navigate("NewRequestScreen");
  // };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getReminders();
    setRefreshing(false);
  };


  return (
    <View>
      <View>
      <Text>Consultar un presupuesto:</Text>
        <TextInput style={styles.input} placeholder="Referencia presupuesto"></TextInput>
      </View>
      <View>
      <Text>Consultar los presupuestos de un cliente:</Text>
        <TextInput style={styles.input} placeholder="CIF cliente"></TextInput>
      </View>
      <View>
        <Text>Consultar los presupuestos por categoría:</Text>
        <Button title="Terminados" color={colors.primary} onPress={()=>{}} />
        <Button title="En curso" color={colors.primary} onPress={()=>{}} />
        <Button title="Pendientes" color={colors.primary} onPress={()=>{}} />
        <Button title="Bloqueados" color={colors.primary} onPress={()=>{}} />
        <Button title="Desestimados" color={colors.primary} onPress={()=>{}} />
        <Button title="Todos" color={colors.primary} onPress={()=>{}} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
  }
});

export default HomeScreen;
