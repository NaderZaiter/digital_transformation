import { colors } from "../../constants/palette";
import { budgetNotes } from "../../constants/values";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import _ from "lodash";

const AddBudgetComponent = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const [notes, setNotes] = useState(budgetNotes)

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }


  const Submit = () => {

  };

  const getNotes = () => {
    _.map(notes, (note, index) => {
      return (<Text key={index}>{note.value}</Text>)
    })
  }


  return (
    <SafeAreaView style={styles.scrollContainer}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>Acerca del presupuesto:</Text>
          <Text>Fecha:</Text>
          <TextInput style={styles.input} placeholder="dd/mm/yyyy"></TextInput>
          <Text>Número:</Text>
          <TextInput style={styles.input} placeholder="Número presupuesto"></TextInput>
          <Text>Referencia:</Text>
          <TextInput style={styles.input} placeholder="Referencia presupuesto"></TextInput>
        </View>
        <View style={styles.container}>
          <Text>Acerca del cliente:</Text>
            <Text>Nombre:</Text>
            <TextInput style={styles.input} placeholder="Nombre cliente"></TextInput>
            <Text>C.I.F:</Text>
            <TextInput style={styles.input} placeholder="CIF cliente"></TextInput>
            <View style={styles.container}>
              <Text>Dirección:</Text>
              <Text>Calle:</Text>
              <TextInput style={styles.input} placeholder="Calle:"></TextInput>
              <Text>Número:</Text>
              <TextInput style={styles.input} placeholder="Número:"></TextInput>
              <Text>Código postal:</Text>
              <TextInput style={styles.input} placeholder="CP:"></TextInput>
              <Text>Población:</Text>
              <TextInput style={styles.input} placeholder="Población:"></TextInput>
              <Text>Provincia:</Text>
              <TextInput style={styles.input} placeholder="Provincia:"></TextInput>
            </View>
        </View>
        <View style={styles.container}>
          <Text>Acerca de la tareas:</Text>
          <Text>Descripción:</Text>
          <TextInput style={styles.input} placeholder="Descripción"></TextInput>
          <Text>Categoría:</Text>
          <TextInput style={styles.input} placeholder="Categoría"></TextInput>
          <Text>Jornadas:</Text>
          <TextInput style={styles.input} placeholder="1"></TextInput>
          <Text>Precio/unidad:</Text>
          <TextInput style={styles.input} placeholder="0 $"></TextInput>
          <Text>Precio total:</Text>
          <TextInput style={styles.input} placeholder="0 $"></TextInput>
          <Text>Coste:</Text>
          <TextInput style={styles.input} placeholder="Coste"></TextInput>
          <Text>Proveedor:</Text>
          <TextInput style={styles.input} placeholder="Proveedor"></TextInput>
          <Text>Número factura:</Text>
          <TextInput style={styles.input} placeholder="Número factura"></TextInput>
          <Text>Vencimiento:</Text>
          <TextInput style={styles.input} placeholder="Vencimiento"></TextInput>
          <Text>Forma de pago:</Text>
          <TextInput style={styles.input} placeholder="Forma de pago"></TextInput>
          <Text>Fecha de pago:</Text>
          <TextInput style={styles.input} placeholder="Fecha de pago"></TextInput>
        </View>
        <View style={styles.container}>
          <Text>Total presupuesto:</Text>
          <Text>Total costes:</Text>
          <TextInput style={styles.input} placeholder="0"></TextInput>
          <Text>Producción fotográfica:</Text>
          <TextInput style={styles.input} placeholder="0"></TextInput>
          <Text>Fee agencia/producción:</Text>
          <TextInput style={styles.input} placeholder="0"></TextInput>
          <Text>Total presupuesto:</Text>
          <TextInput style={styles.input} placeholder="0"></TextInput>
        </View>
        <View style={styles.container}>
          <Text>Notas:</Text>
          <Text>IBAN:</Text>
          <TextInput style={styles.input} placeholder="IBAN"></TextInput>
          <Text>Fecha vencimiento:</Text>
          <TextInput style={styles.input} placeholder="dd/mm/yyyy"></TextInput>
          {getNotes}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal: 20
  },
  container: {
    marginTop: 20,
  },
  question: {
    color: colors.primary_green,
    paddingLeft: 27,
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 20,
  },
  logoutContainer: {
    backgroundColor: colors.green,
    marginTop: "6%",
    padding: 20,
    alignItems: "center",
  },
  logout: {
    fontSize: 24,
    color: colors.white,
  },
  icon: {
    paddingTop: "25%",
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
    marginHorizontal: 15
  },
  inputContainer: {
    marginHorizontal: "4%",
  },
});

export default AddBudgetComponent;
