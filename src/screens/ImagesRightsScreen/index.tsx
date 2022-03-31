import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/palette";
const ImagesRightsScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state?.user);
  const [imagesRights, setImagesRights] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRequests = () => {
    setImagesRights('No tienes nada todavía')
  }

  useEffect(() => {
    setLoading(true)
    getRequests();
  }, []);

  const navigateFulfilled = () => {
    navigation.navigate("FulfilledScreen");
  };
  const navigateRequests = (id) => {
    navigation.navigate("RequestsScreen", { id: id });
  };
  const navigateNewRequest = () => {
    navigation.navigate("AddBudgetScreen");
  };

  const onRefresh = () => {
    setRefreshing(true);
    getRequests();
    setRefreshing(false);
  };

  return (
    <View>
      <View>
        <Text>Consultar los derechos imagen de un presupuesto:</Text>
        <TextInput style={styles.input} placeholder="Referencia presupuesto"></TextInput>
      </View>
      <View>
        <Text>Consultar los derechos imagen de un cliente:</Text>
        <TextInput style={styles.input} placeholder="CIF cliente"></TextInput>
      </View>
      <View>
        <Text>Consultar los derechos imagen por categoría:</Text>
        <Button title="En curso" color={colors.primary} onPress={() => { }} />
        <Button title="Caducados" color={colors.primary} onPress={() => { }} />
        <Button title="Todos" color={colors.primary} onPress={() => { }} />
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
export default ImagesRightsScreen;
