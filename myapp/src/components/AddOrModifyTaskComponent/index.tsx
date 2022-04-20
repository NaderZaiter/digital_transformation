import { colors } from "../../constants/palette";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Picker
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import _ from "lodash";
import notification from "../../helpers/toast";
import { useRoute } from "@react-navigation/native";
import {DatePicker} from '@material-ui/pickers'

const AddOrModifyTaskComponent = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const pickerRef = useRef();

  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskDays, setTaskDays] = useState("");
  const [taskDayPrice, setTaskDayPrice] = useState("");
  const [taskTotalPrice, setTaskTotalPrice] = useState("");
  const [taskCost, setTaskCost] = useState("0");
  const [taskSupplier, setTaskSupplier] = useState("");
  const [taskInvoiceNumber, setTaskInvoiceNumber] = useState("");
  const [taskExpirationDate, setTaskExpirationDate] = useState(new Date());
  const [taskPaymentMethod, setTaskPaymentMethod] = useState("");
  const [taskPaymentDate, setTaskPaymentDate] = useState(new Date());
  
 
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  const addTask = () => {
    if(!taskDescription){
      notification.danger({message: 'La descripción es obligatoria', useNativeToast: true, duration: 2000});
    }else if(!taskCategory){
      notification.danger({message: 'La categoría es obligatoria', useNativeToast: true, duration: 2000});
    }else{
      const newTask = getObjectTask();
      setTaskValues(resetValuesTask());
      if(_.get(route, 'params.modifyTask.index') >= 0){
        notification.success({message: 'Tarea modificada correctamente', useNativeToast: true, duration: 2000});
        navigation.navigate("AddBudgetScreen", {modifiedTask: {index: _.get(route, 'params.modifyTask.index'), newTask: newTask}});
      }else{
        notification.success({message: 'Tarea agregada correctamente', useNativeToast: true, duration: 2000});
        navigation.navigate("AddBudgetScreen", {newTask: newTask});
      }
    }
  };

  const getObjectTask = () => {
    return {
      taskDescription: taskDescription.trim(),
      taskCategory: taskCategory.trim(),
      taskDays: taskDays.trim(),
      taskDayPrice: taskDayPrice.trim(),
      taskTotalPrice: taskTotalPrice.trim(),
      taskCost: taskCost.trim(),
      taskSupplier: taskSupplier.trim(),
      taskInvoiceNumber: taskInvoiceNumber.trim(),
      taskExpirationDate: taskExpirationDate,
      taskPaymentMethod: taskPaymentMethod.trim(),
      taskPaymentDate: taskPaymentDate,
    }
  }

  const calculateTotalPrice = () => {
    if(taskDayPrice && taskDays) {
      let multi = (Number(taskDayPrice) * Number(taskDays)).toString();
      if(taskTotalPrice !== multi){
        setTaskTotalPrice(multi);
      }
    }
  }

  const formatDate = (date: Date) :string => {
    let result = "";
    if(date){
      result = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    return result;
  }

  const setTaskValues = (task) => {
      setTaskDescription(task.taskDescription);
      setTaskCategory(task.taskCategory);
      setTaskDays(task.taskDays);
      setTaskDayPrice(task.taskDayPrice);
      setTaskTotalPrice(task.taskTotalPrice);
      setTaskCost(task.taskCost);
      setTaskSupplier(task.taskSupplier);
      setTaskInvoiceNumber(task.taskInvoiceNumber);
      setTaskExpirationDate(task.taskExpirationDate);
      setTaskPaymentMethod(task.taskPaymentMethod);
      setTaskPaymentDate(task.taskPaymentDate);
  }

  const resetValuesTask = () => {
    return {
      taskDescription: "",
      taskCategory: "",
      taskDays: "",
      taskDayPrice: "",
      taskTotalPrice: "",
      taskCost: "",
      taskSupplier: "",
      taskInvoiceNumber: "",
      taskExpirationDate: new Date(),
      taskPaymentMethod: "",
      taskPaymentDate: new Date(),
    }
  }

  const route = useRoute()
  const modifyTask = _.get(route, 'params.modifyTask.task');
  if(modifyTask){
    setTaskValues(modifyTask);
    _.set(route, 'params.modifyTask.task', null);
  }

  useEffect(() => {
    setTaskTotalPrice((Number(taskDays) * Number(taskDayPrice)).toString())
  }, [taskDays, taskDayPrice])



  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container}>
            <Text>Descripción:</Text>
            <TextInput value={taskDescription} style={styles.input} placeholder="Descripción" onChangeText={setTaskDescription}></TextInput>
            <Text>Categoría:</Text>
            <TextInput value={taskCategory} style={styles.input} placeholder="Categoría" onChangeText={setTaskCategory}></TextInput>
            {/* <Picker ref={pickerRef} selectedValue={setTaskCategory}>
              <Picker.item label="Realización" value="Realización"></Picker.item>
              <Picker.item label="Estilismo" value="Estilismo"></Picker.item>
              <Picker.item label="Localizaciòn" value="Localizaciòn"></Picker.item>
              <Picker.item label="Producción" value="Producción"></Picker.item>
              <Picker.item label="PP" value="PP"></Picker.item>
              <Picker.item label="Extras" value="Extras"></Picker.item>
            </Picker> */}
            <Text>Jornadas:</Text>
            <TextInput value={taskDays} style={styles.input} placeholder="1" onChangeText={setTaskDays}></TextInput>
            <Text>Precio/unidad:</Text>
            <TextInput value={taskDayPrice} style={styles.input} placeholder="0" onChangeText={setTaskDayPrice}></TextInput>
            <Text>Precio total:</Text>
            <TextInput  value={taskTotalPrice} editable={false} style={styles.input} placeholder="0" onChangeText={setTaskTotalPrice}></TextInput>
            <Text>Coste:</Text>
            <TextInput value={taskCost} style={styles.input} placeholder="Coste" onChangeText={setTaskCost}></TextInput>
            <Text>Proveedor:</Text>
            <TextInput value={taskSupplier} style={styles.input} placeholder="Proveedor" onChangeText={setTaskSupplier}></TextInput>
            <Text>Número factura:</Text>
            <TextInput value={taskInvoiceNumber} style={styles.input} placeholder="Número factura" onChangeText={setTaskInvoiceNumber}></TextInput>
            <Text>Fecha de vencimiento:</Text>
            <DatePicker value={taskExpirationDate} onChange={setTaskExpirationDate}
              style={{width: "100%"}}
              placeholder="Selecciona la fecha" format="yyyy-mm-dd"/>
            <Text>Forma de pago:</Text>
            <TextInput value={taskPaymentMethod} style={styles.input} placeholder="Forma de pago" onChangeText={setTaskPaymentMethod}></TextInput>
            <Text>Fecha de pago:</Text>
            <DatePicker value={taskPaymentDate} onChange={setTaskPaymentDate}
              style={{width: "100%"}}
              placeholder="Selecciona la fecha" format="yyyy-mm-dd"/>
            <Button title="Actualizar presupuesto" color={colors.primary} onPress={addTask}/>
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
