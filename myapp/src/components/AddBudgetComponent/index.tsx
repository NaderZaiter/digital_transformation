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
  Dimensions,
  Picker
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useRoute } from "@react-navigation/native";
import {DatePicker} from '@material-ui/pickers'
import notification from "../../helpers/toast";
import { petitions } from "../../constants/petitions";
import { store } from "../../redux/store";
import { updateBudget } from "../../redux/slices/budgetSlice";

const AddBudgetComponent = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const budgetInfo = useSelector((state) => state?.budget).budgetInfo;
  const [notes, setNotes] = useState(budgetNotes);
  const [tasks, setTasks] = useState([]);
  const [imagesRights, setImagesRight] = useState([]);
  const [creationDate, setCreationDate] = useState(new Date());
  const [budgetNumber, setBudgetNumber] = useState("");
  const [budgetReference, setBudgetReference] = useState("");
  const [budgetStatus, setBudgetStatus] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCIF, setClientCIF] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientStreetNumber, setClientStreetNumber] = useState("");
  const [clientPostalCode, setClientPostalCode] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientProvince, setClientProvince] = useState("");
  const [budgetTotalCosts, setBudgetTotalCosts] = useState("0");
  const [photographicProduction, setPhotographicProduction] = useState("0");
  const [agencyFee, setAgencyFee] = useState("");
  const [totalBudget, setTotalBudget] = useState("0");
  const [budgetExpirationDate, setBudgetExpirationDate] = useState(new Date());
  const [budgetIBAN, setBudgetIBAN] = useState("ES17 0075 8582 3206 0008 1212");
  const [budgetUser, setBudgetUser] = useState(user.userProfile.user);
  const [buttonText, setButtonText] = useState("Agregar presupuesto");

  const addBudgetToDDBB = async () => {
    let result = false;
    await fetch(petitions.add_budget_local, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        creationDate: formatDate(creationDate).trim(),
        budgetNumber: budgetNumber.trim(),
        budgetReference: budgetReference.trim(),
        budgetStatus: budgetStatus.trim(),
        clientName: clientName.trim(),
        clientCIF: clientCIF.trim(),
        clientStreet: clientStreet.trim(),
        clientStreetNumber: clientStreetNumber.trim(),
        clientPostalCode: clientPostalCode.trim(),
        clientCity: clientCity.trim(),
        clientProvince: clientProvince.trim(),
        tasks: setCorrectTasks(tasks),
        imagesRights: setCorrectImagesRights(imagesRights),
        budgetTotalCosts: budgetTotalCosts.trim(),
        photographicProduction: photographicProduction.trim(),
        agencyFee: agencyFee.trim(),
        totalBudget: totalBudget.trim(),
        budgetIBAN: budgetIBAN.trim(),
        budgetExpirationDate: formatDate(budgetExpirationDate).trim(),
        user: budgetUser.trim(),
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  const modifyBudgetFromDDBB = async () => {
    let result = false;
    await fetch(petitions.modify_budget_local, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        creationDate: formatDate(creationDate).trim(),
        budgetNumber: budgetNumber.trim(),
        budgetReference: budgetReference.trim(),
        budgetStatus: budgetStatus.trim(),
        clientName: clientName.trim(),
        clientCIF: clientCIF.trim(),
        clientStreet: clientStreet.trim(),
        clientStreetNumber: clientStreetNumber.trim(),
        clientPostalCode: clientPostalCode.trim(),
        clientCity: clientCity.trim(),
        clientProvince: clientProvince.trim(),
        tasks: setCorrectTasks(tasks),
        imagesRights: setCorrectImagesRights(imagesRights),
        budgetTotalCosts: budgetTotalCosts.trim(),
        photographicProduction: photographicProduction.trim(),
        agencyFee: agencyFee.trim(),
        totalBudget: totalBudget.trim(),
        budgetIBAN: budgetIBAN.trim(),
        budgetExpirationDate: formatDate(budgetExpirationDate).trim(),
        user: budgetUser.trim(),
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  const setCorrectTasks = (tasks) => {
    tasks.forEach((task) => () => {
      task.taskExpirationDate = formatDate(task.taskExpirationDate);
      task.taskPaymentDate = formatDate(task.taskPaymentDate);
    })
    return tasks;
  }

  const setCorrectImagesRights = (imagesRights) => {
    imagesRights.forEach((imageRights) => () => {
      imageRights.campaignStartDate = formatDate(imageRights.campaignStartDate);
      imageRights.campaignEndDate = formatDate(imageRights.campaignEndDate);
    })
    return imagesRights;
  }

  const addBudget = async() => {
    if(!creationDate){
      notification.danger({message: 'La fecha de creación es obligatoria', useNativeToast: true, duration: 2000});
    }else if(!budgetNumber){
      notification.danger({message: 'El numero del presupuesto es obligatorio', useNativeToast: true, duration: 2000});
    }else if(!budgetReference){
      notification.danger({message: 'La referencia del presupuesto es obligatoria', useNativeToast: true, duration: 2000});
    }else if(!budgetStatus){
      notification.danger({message: 'El estado del presupuesto es obligatorio', useNativeToast: true, duration: 2000});
    }else if(!clientName){
      notification.danger({message: 'El nombre del cliente es obligatorio', useNativeToast: true, duration: 2000});
    }else if(!clientCIF){
      notification.danger({message: 'El CIF del cliente es obligatorio', useNativeToast: true, duration: 2000});
    }else{
      if(budgetInfo){
        if(await modifyBudgetFromDDBB()){
          notification.success({message: 'Presupuesto modificado correctamente', useNativeToast: true, duration: 2000});
        }else{
          notification.danger({message: 'No se ha podido modificar el presupuesto', useNativeToast: true, duration: 2000});
        }
        store.dispatch(updateBudget({budgetInfo: undefined}));
        navigation.goBack();
      }else{
        if(await addBudgetToDDBB()){
          notification.success({message: 'Presupuesto agregado correctamente', useNativeToast: true, duration: 2000});
          store.dispatch(updateBudget({budgetInfo: undefined}));
          navigation.goBack();
        }else{
          notification.danger({message: 'El presupuesto ya existe', useNativeToast: true, duration: 2000});
        }
      }
    }
  };

  const formatDate = (date: Date) : string => {
    let result = "";
    if(date){
      result = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    return result;
  }

  const navigateAddOrModifyTaskScreen = (params) => {
    navigation.navigate("AddOrModifyTaskScreen", params);
  };

  const navigateAddOrModifyImageRightsScreen= (params) => {
    navigation.navigate("AddOrModifyImageRightsScreen", params);
  };

  const getNewTask = () => {
    tasks.push(newTask);
    calculateTotal();
    _.set(route, 'params.newTask', null);
  };

  const getModifiedTask = () => {
    tasks[modifiedTask.index] = modifiedTask.newTask;
    calculateTotal();
    _.set(route, 'params.modifiedTask', null);
  };

  const getNewImageRights = () => {
    imagesRights.push(newImageRights);
    calculateTotal();
    _.set(route, 'params.newImageRights', null);
  };

  const getModifiedImageRights = () => {
    imagesRights[modifiedImageRights.index] = modifiedImageRights.newImageRights;
    calculateTotal();
    _.set(route, 'params.modifiedImageRights', null);
  };

  const getBudgetInfo = () => {
      setButtonText("Modificar presupuesto")
      if(budgetInfo.tasks){
        for(let task of budgetInfo.tasks){
          tasks.push({
            taskDescription: task.description,
            taskCategory: task.category,
            taskDays: task.days_number,
            taskDayPrice: task.day_price,
            taskTotalPrice: task.total_price,
            taskCost: task.cost,
            taskSupplier: task.supplier,
            taskInvoiceNumber: task.invoice_number,
            taskExpirationDate: new Date(task.expiration_date),
            taskPaymentMethod: task.payment_method,
            taskPaymentDate: new Date(task.payment_date),
          });
        }
      }
      if(budgetInfo.imagesRights){
        for(let imageRights of budgetInfo.imagesRights){
          imagesRights.push({
            agencyName: imageRights.agency_name,
            modelName: imageRights.model_name,
            campaign: imageRights.campaign,
            rightsDuration: imageRights.rights_duration,
            campaignStartDate: new Date(imageRights.campaign_start_date),
            campaignEndDate: new Date(imageRights.campaign_end_date),
            invoiceNumber: imageRights.invoice_number,
            rightsAmount: imageRights.rights_amount,
            rightsRenewalAmount: imageRights.rights_renewal_amount,
          });
        }
      }
      setClientName(budgetInfo.client.name);
      setClientCIF(budgetInfo.client.cif);
      setClientStreet(budgetInfo.client.street);
      setClientStreetNumber(budgetInfo.client.street_number);
      setClientPostalCode(budgetInfo.client.postal_code);
      setClientCity(budgetInfo.client.city);
      setClientProvince(budgetInfo.client.province);
      setBudgetReference(budgetInfo.budget.id);
      setBudgetStatus(budgetInfo.budget.status);
      setCreationDate(new Date(Number(budgetInfo.budget.creation_date.split('-')[0]), Number(budgetInfo.budget.creation_date.split('-')[1]) - 1,  Number(budgetInfo.budget.creation_date.split('-')[2])));
      setBudgetNumber(budgetInfo.budget.budget_number);
      setBudgetTotalCosts(budgetInfo.budget.total_costs);
      setPhotographicProduction(budgetInfo.budget.photographic_production);
      setAgencyFee(budgetInfo.budget.agency_fee);
      setTotalBudget(budgetInfo.budget.total_budget);
      setBudgetExpirationDate(new Date(budgetInfo.budget.expiration_date));
      setBudgetIBAN(budgetInfo.budget.iban);
      setBudgetUser(budgetInfo.budget.user);
  };

  const calculateTotal = () => {
    let costs = 0;
    let photographicProduction = 0;
    for(let task of tasks){
      if(task.taskCost){
        costs+= Number(task.taskCost);
      }
      if(task.taskTotalPrice){
        photographicProduction+= Number(task.taskTotalPrice)
      }
    }
    setBudgetTotalCosts(costs.toString());
    setPhotographicProduction(photographicProduction.toString());
    if(agencyFee){
      setTotalBudget((photographicProduction + Number(agencyFee) - costs).toString());
    }else{
      setTotalBudget((photographicProduction - costs).toString());
    }
  };

  const route = useRoute()
  const newTask = _.get(route, 'params.newTask');
  const modifiedTask = _.get(route, 'params.modifiedTask');
  const newImageRights = _.get(route, 'params.newImageRights');
  const modifiedImageRights = _.get(route, 'params.modifiedImageRights');
  if(newTask){
    getNewTask();
  }else if(modifiedTask){
    getModifiedTask();
  }else if(newImageRights){
    getNewImageRights();
  }else if(modifiedImageRights){
    getModifiedImageRights();
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((task, indexTask) => indexTask !== index));
  };

  const deleteImageRights = (index) => {
    setTasks(imagesRights.filter((imageRights, indexImageRights) => indexImageRights !== index));
  };
  
  useEffect(() => {
    if(budgetInfo){
      getBudgetInfo();
    }
  }, [budgetInfo])

  useEffect(() => {
    calculateTotal();
  }, [agencyFee]);

  useEffect(() => {
    calculateTotal();
  }, [tasks]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>Acerca del presupuesto:</Text>
          <Text>Fecha:</Text>
          <DatePicker disabled={(budgetInfo)} value={creationDate} onChange={setCreationDate}
           style={{width: "100%"}}
           placeholder="Selecciona la fecha" format="yyyy-mm-dd"/>
          <Text>Número:</Text>
          <TextInput editable={!(budgetInfo)} value={budgetNumber} style={styles.input} placeholder="Número presupuesto" onChangeText={setBudgetNumber}></TextInput>
          <Text>Referencia:</Text>
          <TextInput editable={!(budgetInfo)} value={budgetReference} style={styles.input} placeholder="Referencia presupuesto" onChangeText={setBudgetReference}></TextInput>
          <Text>Estado:</Text>
          <TextInput value={budgetStatus} style={styles.input} placeholder="Estado presupuesto" onChangeText={setBudgetStatus}></TextInput>
        </View>
        <View style={styles.container}>
          <Text>Acerca del cliente:</Text>
            <Text>Nombre:</Text>
            <TextInput value={clientName} style={styles.input} placeholder="Nombre cliente" onChangeText={setClientName}></TextInput>
            <Text>C.I.F:</Text>
            <TextInput value={clientCIF} style={styles.input} placeholder="CIF cliente" onChangeText={setClientCIF}></TextInput>
            <View style={styles.container}>
              <Text>Dirección:</Text>
              <Text>Calle:</Text>
              <TextInput value={clientStreet} style={styles.input} placeholder="Calle" onChangeText={setClientStreet}></TextInput>
              <Text>Número:</Text>
              <TextInput value={clientStreetNumber} style={styles.input} placeholder="Número" onChangeText={setClientStreetNumber}></TextInput>
              <Text>Código postal:</Text>
              <TextInput value={clientPostalCode} style={styles.input} placeholder="CP" onChangeText={setClientPostalCode}></TextInput>
              <Text>Población:</Text>
              <TextInput value={clientCity} style={styles.input} placeholder="Población" onChangeText={setClientCity}></TextInput>
              <Text>Provincia:</Text>
              <TextInput value={clientProvince} style={styles.input} placeholder="Provincia" onChangeText={setClientProvince}></TextInput>
            </View>
        </View>
        <View style={styles.container}>
          <Text>Acerca de las tareas:<Button title="+" color={colors.black} onPress={() => {navigateAddOrModifyTaskScreen(null)}} /></Text>
          {tasks.map((task, indexTask) => {
            return (
            <View key={indexTask}>
              <Text>{task.taskDescription}
                <Text>{task.taskCategory}
                  <Button title="Editar" color={colors.black} onPress={() => {navigateAddOrModifyTaskScreen({modifyTask: {index: indexTask, task: task}})}}/>
                  <Button title="Borrar" color={colors.red} onPress={() => {deleteTask(indexTask)}} />
                </Text>
              </Text>
            </View>
            )
          })}
        </View>
        <View style={styles.container}>
          <Text>Acerca de los derechos imágen:<Button title="+" color={colors.black} onPress={() => {navigateAddOrModifyImageRightsScreen(null)}} /></Text>
          {imagesRights.map((imageRights, indexImageRights) => {
            return (
            <View key={indexImageRights}>
              <Text>{imageRights.agencyName}
                <Text>{imageRights.modelName}
                  <Button title="Editar" color={colors.black} onPress={() => {navigateAddOrModifyImageRightsScreen({modifyImageRights: {index: indexImageRights, imageRights: imageRights}})}}/>
                  <Button title="Borrar" color={colors.red} onPress={() => {deleteImageRights(indexImageRights)}} />
                </Text>
              </Text>
            </View>
            )
          })}
        </View>
        <View style={styles.container}>
          <Text>Total presupuesto:</Text>
          <Text>Total costes:</Text>
          <TextInput value={budgetTotalCosts} editable={false} style={styles.input} placeholder="0" onChangeText={setBudgetTotalCosts}></TextInput>
          <Text>Producción fotográfica:</Text>
          <TextInput value={photographicProduction} style={styles.input} editable={false} placeholder="0" onChangeText={setPhotographicProduction}></TextInput>
          <Text>Fee agencia/producción:</Text>
          <TextInput value={agencyFee} style={styles.input} placeholder="0" onChangeText={setAgencyFee}></TextInput>
          <Text>Total presupuesto:</Text>
          <TextInput value={totalBudget} editable={false} style={styles.input} placeholder="0" onChangeText={setTotalBudget}></TextInput>
        </View>
        <View style={styles.container}>
          <Text>Notas:</Text>
          <Text>IBAN:</Text>
          <TextInput value={budgetIBAN} style={styles.input} placeholder="IBAN" onChangeText={setBudgetIBAN}></TextInput>
          <Text>Fecha vencimiento:</Text>
          <DatePicker value={budgetExpirationDate} onChange={setBudgetExpirationDate}
           style={{width: "100%"}}
           placeholder="Selecciona la fecha" format="yyyy-mm-dd"/>
          {notes.map((note) => {
            return (
            <View key={note.id}>
              <Text>{note.value}</Text>
            </View>
            )
          })}
        </View>
        <View>
            <Button title={buttonText} color={colors.black} onPress={() => {addBudget()}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
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
