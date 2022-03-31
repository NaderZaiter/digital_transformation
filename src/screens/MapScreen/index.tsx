import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import {useSelector} from "react-redux";
import { colors } from "../../constants/palette";


const MapScreen = ({navigation}) => {
  const user = useSelector((state) => state?.user);
  const [requests, setRequests] = useState();

  const navigateNewRequest = () => {
    navigation.navigate("NewRequestScreen");
  };

  const navigateRequestView = (id) => {
    navigation.navigate("RequestViewScreen", {id: id});
  };
  
  const getRequests = () => {
    
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <View>
      <View>
        <Text>Consultar el historial de un colaborador:</Text>
        <TextInput style={styles.input} placeholder="Nombre/DNI colaborador"></TextInput>
      </View>
      <View>
        <Text>Consultar los colaboradores de un presupuesto:</Text>
        <TextInput style={styles.input} placeholder="Referencia presupuesto"></TextInput>
      </View>
      <View>
        <Text>Consultar los colaboradores por categoría:</Text>
          <Button title="Fotógrafos" color={colors.primary} onPress={()=>{}} />
          <Button title="Modelistas" color={colors.primary} onPress={()=>{}} />
          <Button title="Todos" color={colors.primary} onPress={()=>{}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
  }
});

export default MapScreen;
