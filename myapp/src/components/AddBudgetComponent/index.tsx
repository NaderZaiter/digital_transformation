import { colors } from "../../constants/palette";
import { budgetNotes } from "../../constants/values";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import _ from "lodash";
import Toast from 'react-native-toast-message';

const AddBudgetComponent = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const pickerRef = useRef();
  const [notes, setNotes] = useState(budgetNotes);
  const [tasks, setTasks] = useState([]);
  const [creationDate, setCreationDate] = useState("");
  const [budgetNumber, setBudgetNumber] = useState("");
  const [budgetReference, setBudgetReference] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCIF, setClientCIF] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientStreetNumber, setClientStreetNumber] = useState("");
  const [clientPostalCode, setClientPostalCode] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientProvince, setClientProvince] = useState("");
  const [budgetTotalCosts, setBudgetTotalCosts] = useState("");
  const [photographicProduction, setPhotographicProduction] = useState("");
  const [agencyFee, setAgencyFee] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [budgetExpirationDate, setBudgetExpirationDate] = useState("");
  const [budgetIBAN, setBudgetIBAN] = useState("");
  let currentTask: any = {};




 
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  const addBudget = () => {

  };

  const navigateAddOrModifyTaskScreen = () => {
    navigation.navigate("AddOrModifyTaskScreen");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <Toast />

        <View style={styles.container}>
          <Text>Acerca del presupuesto:</Text>
          <Text>Fecha:</Text>
          <TextInput style={styles.input} placeholder="dd/mm/yyyy" onChangeText={setCreationDate}></TextInput>
          <Text>Número:</Text>
          <TextInput style={styles.input} placeholder="Número presupuesto" onChangeText={setBudgetNumber}></TextInput>
          <Text>Referencia:</Text>
          <TextInput style={styles.input} placeholder="Referencia presupuesto" onChangeText={setBudgetReference}></TextInput>
        </View>
        <View style={styles.container}>
          <Text>Acerca del cliente:</Text>
            <Text>Nombre:</Text>
            <TextInput style={styles.input} placeholder="Nombre cliente" onChangeText={setClientName}></TextInput>
            <Text>C.I.F:</Text>
            <TextInput style={styles.input} placeholder="CIF cliente" onChangeText={setClientCIF}></TextInput>
            <View style={styles.container}>
              <Text>Dirección:</Text>
              <Text>Calle:</Text>
              <TextInput style={styles.input} placeholder="Calle:" onChangeText={setClientStreet}></TextInput>
              <Text>Número:</Text>
              <TextInput style={styles.input} placeholder="Número:" onChangeText={setClientStreetNumber}></TextInput>
              <Text>Código postal:</Text>
              <TextInput style={styles.input} placeholder="CP:" onChangeText={setClientPostalCode}></TextInput>
              <Text>Población:</Text>
              <TextInput style={styles.input} placeholder="Población:" onChangeText={setClientCity}></TextInput>
              <Text>Provincia:</Text>
              <TextInput style={styles.input} placeholder="Provincia:" onChangeText={setClientProvince}></TextInput>
            </View>
        </View>
        <View style={styles.container}>
          <Text>Acerca de las tareas:<Button title="+" color={colors.black} onPress={navigateAddOrModifyTaskScreen} /></Text>
          {tasks.map((task, indexTask) => {
            return (
            <View key={indexTask}>
              <Text>{task.description}
                <Button title="Editar" color={colors.black} onPress={() => {}}/>
                <Button title="Borrar" color={colors.red} onPress={() => {}} />
              </Text>
            </View>
            )
          })}
        </View>
        <View style={styles.container}>
          <Text>Total presupuesto:</Text>
          <Text>Total costes:</Text>
          <TextInput style={styles.input} placeholder="0" onChangeText={setBudgetTotalCosts}></TextInput>
          <Text>Producción fotográfica:</Text>
          <TextInput style={styles.input} placeholder="0" onChangeText={setPhotographicProduction}></TextInput>
          <Text>Fee agencia/producción:</Text>
          <TextInput style={styles.input} placeholder="0" onChangeText={setAgencyFee}></TextInput>
          <Text>Total presupuesto:</Text>
          <TextInput style={styles.input} placeholder="0" onChangeText={setTotalBudget}></TextInput>
        </View>
        <View style={styles.container}>
          <Text>Notas:</Text>
          <Text>IBAN:</Text>
          <TextInput style={styles.input} placeholder="IBAN" onChangeText={setBudgetIBAN}></TextInput>
          <Text>Fecha vencimiento:</Text>
          <TextInput style={styles.input} placeholder="dd/mm/yyyy" onChangeText={setBudgetExpirationDate}></TextInput>
          {notes.map((note) => {
            return (
            <View key={note.id}>
              <Text>{note.value}</Text>
            </View>
            )
          })}
        </View>
        <View>
            <Button title="Agregar presupuesto" color={colors.black} onPress={addBudget} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
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
