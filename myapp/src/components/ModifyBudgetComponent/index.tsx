import { colors } from "../../constants/palette";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";
import notification from "../../helpers/toast";
import { petitions } from "../../constants/petitions";

const ModifyBudgetComponent = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const [budgetReference, setBudgetReference] = useState(new Date());
  const [budgets, setBudgets] = useState([]);

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }


  const getBudgets = async() => {
    if(budgetReference){
      if(await searchBudget()){
        if(budgets.length === 1){
          notification.success({message: `Se ha encontrado ${budgets.length} resultado`, useNativeToast: true, duration: 2000});
        }else{
          notification.success({message: `Se han encontrado ${budgets.length} resultados`, useNativeToast: true, duration: 2000});
        }
      }else{
        notification.danger({message: 'El presupuesto no existe', useNativeToast: true, duration: 2000});
      }
    }else{
      notification.danger({message: 'La referencia del presupuesto es obligatoria', useNativeToast: true, duration: 2000});
    }
  };

  const searchBudget = async() => {
    let result = false;
    await fetch(petitions.get_budget_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        idBudget: budgetReference
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {
          setBudgets(responseJson.budgets)
          result = true;
        }else{
          setBudgets([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setBudgets([]);
      });
      return result;
  }

  const deleteBudgetFromDDBB = async(budget) => {
    let result = false;
    await fetch(petitions.delete_budget_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        idBudget: budget.id,
        budgetNumber: budget.budget_number
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {  
          setBudgets(budgets.filter(bud=>bud.id !== budget.id && bud.budget_number !== budget.budget_number));
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  }

  const deleteBudget = async(budget) => {
    if(await deleteBudgetFromDDBB(budget)){
      notification.success({message: 'Presupuesto eliminado correctamente', useNativeToast: true, duration: 2000});
    }else{
      notification.danger({message: 'No se ha podido eliminar el presupuesto', useNativeToast: true, duration: 2000});
    }
  }

  const getBudgetClient = async(budget) => {
    let result = null;
    await fetch(petitions.get_budget_client, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        idBudget: budget.id,
        budgetNumber: budget.budget_number
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) { 
          result = responseJson.client;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  }

  const getBudgetTasks = async(budget) => {
    let result = null;
    await fetch(petitions.get_budget_tasks, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        idBudget: budget.id,
        budgetNumber: budget.budget_number
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) { 
          result = responseJson.tasks;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  }

  const editBudget = async(budget) => {
    const client = await getBudgetClient(budget);
    const tasks = await getBudgetTasks(budget);
    navigation.navigate("AddBudgetScreen", {budgetInfo: {budget: budget, client: client, tasks: tasks}});
  }

  return (
    <ScrollView>
      <View>
        <Text>Busca el presupuesto que quieres modificar:</Text>
        <TextInput style={styles.input} placeholder="Referencia presupuesto" onChangeText={setBudgetReference}></TextInput>
            <Button title="Consultar" color={colors.black} onPress={() => {getBudgets()}} />
      </View>
      <View>
      {budgets.map((budget, index) => {
            return (
            <View key={index}>
              <Text>{index+1}: 
                <Text>{budget.budget_number}
                  <Text>{budget.total_budget}
                    <Text>{budget.user}
                      <Button title="Editar" color={colors.black} onPress={() => {editBudget(budget)}}/>
                      <Button title="Borrar" color={colors.red} onPress={() => {deleteBudget(budget)}} />
                    </Text>
                  </Text>
                </Text>
              </Text>
            </View>
            )
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default ModifyBudgetComponent;
