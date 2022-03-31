import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { colors } from "../../constants/palette";
import { TextInput } from "react-native-gesture-handler";

const BudgetsScreen = ({ navigation }) => {

  const getReminders = () => {

  }

  useEffect(() => {
    getReminders();
  }, []);

  const navigateAddBudgetScreen= () => {
    navigation.navigate("AddBudgetScreen");
  };

  const navigateModifyBudgetScreen = () => {
    navigation.navigate("ModifyBudgetScreen");
  };

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
        <Button title="Terminados" color={colors.primary} onPress={() => { }} />
        <Button title="En curso" color={colors.primary} onPress={() => { }} />
        <Button title="Pendientes" color={colors.primary} onPress={() => { }} />
        <Button title="Bloqueados" color={colors.primary} onPress={() => { }} />
        <Button title="Desestimados" color={colors.primary} onPress={() => { }} />
        <Button title="Todos" color={colors.primary} onPress={() => { }} />
      </View>
      <View style={styles.registerBtnContainer}>
        <TouchableOpacity onPress={navigateModifyBudgetScreen}>
          <Text style={styles.signinrBtn}>Modificar presupuesto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerBtnContainer}>
        <TouchableOpacity onPress={navigateAddBudgetScreen}>
          <Text style={styles.signinrBtn}>Agregar presupuesto</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
  },
  registerBtnContainer: {
    marginTop: "6%",
    flexDirection: "row",
  },
  signinrBtn: {
    fontSize: 16,
  },
});

export default BudgetsScreen;
