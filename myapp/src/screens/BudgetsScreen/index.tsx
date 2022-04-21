import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, Pressable } from "react-native";
import { colors } from "../../constants/palette";
import { TextInput } from "react-native-gesture-handler";
import notification from "../../helpers/toast";
import { petitions } from "../../constants/petitions";
import { store } from "../../redux/store";
import { updateBudget } from "../../redux/slices/budgetSlice";
import { useSelector } from "react-redux";

const BudgetsScreen = ({ navigation }) => {
  const user = useSelector((state) => state?.user);
  const budgetInfo = useSelector((state) => state?.budget).budgetInfo;
  const [budgetReference, setBudgetReference] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [clientCIF, setClientCIF] = useState("");


  const navigateAddBudgetScreen= () => {
    navigation.navigate("AddBudgetScreen");
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  
  const getBudgetsById = async() => {
    setClientCIF("");
    if(budgetReference){
      if(!await searchBudgetsByID()){
        notification.danger({message: 'El presupuesto no existe', useNativeToast: true, duration: 2000});
      }
    }else{
      notification.danger({message: 'La referencia del presupuesto es obligatoria', useNativeToast: true, duration: 2000});
    }
  };

  const searchBudgetsByID = async() => {
    let result = false;
    await fetch(petitions.get_budgets_by_id_local, {
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

  const getBudgetImagesRights = async(budget) => {
    let result = null;
    await fetch(petitions.get_budget_images_rights, {
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
          result = responseJson.imagesRights;
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
    const imagesRights = await getBudgetImagesRights(budget);
    store.dispatch(
      updateBudget({
        budgetInfo: {
          budget: budget,
          client: client,
          tasks: tasks,
          imagesRights: imagesRights
        },
      })
    );
    navigation.navigate("AddBudgetScreen");
  }

  const getBudgetsByCIF = async() => {
    setBudgetReference("");
    if(clientCIF){
      if(!await searchBudgetsByCIF()){
        notification.danger({message: 'No se ha encontrado ningún presupuesto', useNativeToast: true, duration: 2000});
      }
    }else{
      notification.danger({message: 'El CIF del cliente es obligatorio', useNativeToast: true, duration: 2000});
    }
  };

  const searchBudgetsByCIF = async() => {
    let result = false;
    await fetch(petitions.get_budgets_by_cif_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        clientCIF: clientCIF
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

  const getBudgetsByStatus = async(category) => {
    setBudgetReference("");
    setClientCIF("");
    if(!await searchBudgetsByStatus(category)){
      notification.danger({message: 'No se ha encontrado ningún presupuesto', useNativeToast: true, duration: 2000});
    }
  };

  const searchBudgetsByStatus = async(status) => {
    let result = false;
    await fetch(petitions.get_budgets_by_status_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        status: status
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

  const searchBudgets = async() => {
    let result = false;
    await fetch(petitions.get_all_budgets_local, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
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

  const getAllBudgets = async() => {
    setBudgetReference("");
    setClientCIF("");
    if(!await searchBudgets()){
      notification.danger({message: 'No se ha encontrado ningún presupuesto', useNativeToast: true, duration: 2000});
    }
  }

  const getMyBudgets = async() => {
    setBudgetReference("");
    setClientCIF("");
    if(!await searchMyBudgets()){
      notification.danger({message: 'No se ha encontrado ningún presupuesto', useNativeToast: true, duration: 2000});
    }
  }

  const searchMyBudgets = async() => {
    let result = false;
    await fetch(petitions.get_user_budgets_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        user: user.userProfile.user
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


  useEffect(() => {
    if(budgets[0]){
      if(budgets.length === 1){
        notification.success({message: `Se ha encontrado ${budgets.length} presupuesto`, useNativeToast: true, duration: 2000});
      }else{
        notification.success({message: `Se han encontrado ${budgets.length} presupuestos`, useNativeToast: true, duration: 2000});
      }
    }
  }, [budgets]);

  useEffect(() => {
    if(budgetInfo === undefined){
      setBudgets([])
    }
  }, [budgetInfo])

  return (
    <View>
      <View>
        <Text>Consultar un presupuesto:</Text>
        <TextInput value={budgetReference} style={styles.input} placeholder="Referencia presupuesto" onChangeText={setBudgetReference}></TextInput>
        <Button title="Consultar" color={colors.black} onPress={() => {getBudgetsById()}} />
      </View>
      <View>
        <Text>Consultar los presupuestos de un cliente:</Text>
        <TextInput value={clientCIF} style={styles.input} placeholder="CIF cliente" onChangeText={(cif) => {setClientCIF(cif)}}></TextInput>
        <Button title="Consultar" color={colors.black} onPress={() => {getBudgetsByCIF()}} />
      </View>
      <View>
        <Text>Consultar los presupuestos por categoría:</Text>
        <View style={styles.buttonRowView}>
          <Button title="Todos" color={colors.primary} onPress={()=>{getAllBudgets()}} />
          <Button title="Terminados" color={colors.primary} onPress={()=>{getBudgetsByStatus('Terminado')}} />
          <Button title="En curso" color={colors.primary} onPress={()=>{getBudgetsByStatus('En curso')}} />
        </View>
        <View style={styles.buttonRowView}>
          <Button title="Pendientes" color={colors.primary} onPress={()=>{getBudgetsByStatus('Pendiente')}} />
          <Button title="Desestimados" color={colors.primary} onPress={()=>{getBudgetsByStatus('Desestimado')}} />
          <Button title="Bloqueados" color={colors.primary} onPress={()=>{getBudgetsByStatus('Bloqueado')}} />
        </View>
      </View>
      <View>
        <Button title="Consultar mis presupuestos" color={colors.black} onPress={() => {getMyBudgets()}} />
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
          <View style={styles.addButton}>
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
  buttonRowView:{
    display: 'flex',
    padding: '5px',
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: colors.background,
  },
  container: {
    marginLeft: 250,
    position: 'absolute',
    zIndex: 2
  },
  addButton: {
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
