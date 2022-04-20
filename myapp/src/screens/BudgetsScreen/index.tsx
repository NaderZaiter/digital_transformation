import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, Image } from "react-native";
import { colors } from "../../constants/palette";
import { TextInput } from "react-native-gesture-handler";
import notification from "../../helpers/toast";
import { petitions } from "../../constants/petitions";
import { store } from "../../redux/store";
import { updateBudget } from "../../redux/slices/budgetSlice";
const BudgetsScreen = ({ navigation }) => {
  const [budgetReference, setBudgetReference] = useState("");
  const [budgets, setBudgets] = useState([]);

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
  
  const getBudgets = async() => {
    if(budgetReference){
      if(await searchBudget()){
        if(budgets.length === 0){
          notification.success({message: `Se ha encontrado ${budgets.length + 1} resultado`, useNativeToast: true, duration: 2000});
        }else{
          notification.success({message: `Se han encontrado ${budgets.length + 1} resultados`, useNativeToast: true, duration: 2000});
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
          console.log(responseJson)
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
    store.dispatch(
      updateBudget({
        budgetInfo: {
          budget: budget,
          client: client,
          tasks: tasks
        },
      })
    );
    navigation.navigate("AddBudgetScreen", {budgetInfo: {budget: budget, client: client, tasks: tasks}});
  }

  useEffect(() => {
    console.log(budgets)
  }, [budgets])

  return (
    <View>
      <View>
        <Text>Busca el presupuesto que quieres modificar:</Text>
        <TextInput style={styles.input} placeholder="Referencia presupuesto" onChangeText={setBudgetReference}></TextInput>
            <Button title="Consultar" color={colors.black} onPress={() => {getBudgets()}} />
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
      <View>
        <TouchableOpacity style={styles.container} onPress={navigateAddBudgetScreen}>
          <View style={styles.button}>
          <Image
            source={require("../../../assets/budget-icon.png")}
            resizeMode='contain'
            style={{width: 30, height: 30, tintColor: colors.black}}
          />
          </View>
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
  container: {
    marginLeft: 250,
    position: 'absolute',
    zIndex: 2
  },
  button: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    top: 60,
    left: 30,
    paddingTop: 16,
    paddingBottom: 10,
    paddingLeft: 15,
    borderRadius: 20
  }
});

export default BudgetsScreen;
