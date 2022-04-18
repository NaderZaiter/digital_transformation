import { colors } from "../../constants/palette";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import _ from "lodash";
import notification from "../../helpers/toast";
const AddOrModifyTaskComponent = ({ taskParemeter }) => {
  const user = useSelector((state) => state?.user);
  const pickerRef = useRef();
  const [tasks, setTasks] = useState([]);

  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskDays, setTaskDays] = useState("");
  const [taskDayPrice, setTaskDayPrice] = useState("");
  const [taskTotalPrice, setTaskTotalPrice] = useState("");
  const [taskCost, setTaskCost] = useState("");
  const [taskSupplier, setTaskSupplier] = useState("");
  const [taskInvoiceNumber, setTaskInvoiceNumber] = useState("");
  const [taskExpirationDate, setTaskExpirationDate] = useState("");
  const [taskPaymentMethod, setTaskPaymentMethod] = useState("");
  const [taskPaymentDate, setTaskPaymentDate] = useState("");
  
  if(taskParemeter){
    
  }
 
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  const addTask = () => {
    if(!taskDescription){
      notification.danger({message: 'La descripción es obligatoria.', useNativeToast: true, duration: 2000});
    }else if(!taskCategory){
      notification.danger({message: 'La categoría es obligatoria.', useNativeToast: true, duration: 2000});
    }else{
      notification.success({message: 'Tarea agregada correctamente.', useNativeToast: true, duration: 2000});
      setTasks([...tasks, getObjectTask()]);
      resetValuesTask();
    }
  };

  const getObjectTask = () => {
    return {
      taskDescription: taskDescription,
      taskCategory: taskCategory,
      taskDays: taskDays,
      taskDayPrice: taskDayPrice,
      taskTotalPrice: taskTotalPrice,
      taskCost: taskCost,
      taskSupplier: taskSupplier,
      taskInvoiceNumber: taskInvoiceNumber,
      taskExpirationDate: taskExpirationDate,
      taskPaymentMethod: taskPaymentMethod,
      taskPaymentDate: taskPaymentDate,
    }
  }

  const resetValuesTask = () => {
    setTaskDescription("");
    setTaskCategory("");
    setTaskDays("");
    setTaskDayPrice("");
    setTaskTotalPrice("");
    setTaskCost("");
    setTaskSupplier("");
    setTaskInvoiceNumber("");
    setTaskExpirationDate("");
    setTaskPaymentMethod("");
    setTaskPaymentDate("");
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container}>
            <Text>Descripción:</Text>
            <TextInput style={styles.input} placeholder="Descripción" onChangeText={setTaskDescription}></TextInput>
            <Text>Categoría:</Text>
            <TextInput style={styles.input} placeholder="Categoría" onChangeText={setTaskCategory}></TextInput>
            <Text>Jornadas:</Text>
            <TextInput style={styles.input} placeholder="1" onChangeText={setTaskDays}></TextInput>
            <Text>Precio/unidad:</Text>
            <TextInput style={styles.input} placeholder="0" onChangeText={setTaskDayPrice}></TextInput>
            <Text>Precio total:</Text>
            <TextInput style={styles.input} placeholder="0" onChangeText={setTaskTotalPrice}></TextInput>
            <Text>Coste:</Text>
            <TextInput style={styles.input} placeholder="Coste" onChangeText={setTaskCost}></TextInput>
            <Text>Proveedor:</Text>
            <TextInput style={styles.input} placeholder="Proveedor" onChangeText={setTaskSupplier}></TextInput>
            <Text>Número factura:</Text>
            <TextInput style={styles.input} placeholder="Número factura" onChangeText={setTaskInvoiceNumber}></TextInput>
            <Text>Vencimiento:</Text>
            <TextInput style={styles.input} placeholder="Vencimiento" onChangeText={setTaskExpirationDate}></TextInput>
            <Text>Forma de pago:</Text>
            <TextInput style={styles.input} placeholder="Forma de pago" onChangeText={setTaskPaymentMethod}></TextInput>
            <Text>Fecha de pago:</Text>
            <TextInput style={styles.input} placeholder="Fecha de pago" onChangeText={setTaskPaymentDate}></TextInput>
            <Button title="Agregar" color={colors.primary} onPress={addTask}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default AddOrModifyTaskComponent;
