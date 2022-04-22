import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/palette";
import { petitions } from "../../constants/petitions";
import notification from "../../helpers/toast";
import { updateImageRights } from "../../redux/slices/imagesRightsSlice";
import { store } from "../../redux/store";

const ImagesRightsScreen = ({navigation}) => {
  const imageRightsEdited = useSelector((state) => state?.imageRights).imageRights;
  const [imagesRights, setImagesRights] = useState([]);
  const [budgetReference, setBudgetReference] = useState("");
  const [budgetNumber, setBudgetNumber] = useState("");
  const [clientCIF, setClientCIF] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const getBudgetImagesRights = async() => {
    setClientCIF("");
    setInvoiceNumber("");
    if(!budgetReference){
      notification.danger({message: 'La referencia del presupuesto es obligatoria', useNativeToast: true, duration: 2000});

    }else if(!budgetNumber){
      notification.danger({message: 'El número del presupuesto es obligatorio', useNativeToast: true, duration: 2000});

    }else if(!await searchBudgetimagesRights()){
      setImagesRights([]);
      notification.danger({message: 'No se ha encontrado ningún derecho', useNativeToast: true, duration: 2000});
    }
  };

  const searchBudgetimagesRights = async() => {
    let result = false;
    await fetch(petitions.get_budget_images_rights_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        idBudget: budgetReference,
        budgetNumber: budgetNumber
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {  
          setImagesRights(responseJson.imagesRights);
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  }

  const editImageRights = async(imageRights) => {
    store.dispatch(
      updateImageRights({
        imageRights: imageRights
      })
    );
    navigation.navigate("AddOrModifyImageRightsScreen");
  }

  const deleteImageRights = async(id) => {
    if(await deleteImageRightsFromDDBB(id)){
      notification.success({message: 'Derechos eliminados correctamente', useNativeToast: true, duration: 2000});
    }else{
      notification.danger({message: 'No se ha podido eliminar los derechos', useNativeToast: true, duration: 2000});
    }
  }

  const deleteImageRightsFromDDBB = async(id) => {
    let result = false;
    await fetch(petitions.delete_image_rights_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        id: id
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {
          setImagesRights([]);
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  };

  const getClientImagesRights = async() => {
    setBudgetReference("");
    setBudgetNumber("");
    setInvoiceNumber("");
    if(!clientCIF){
      notification.danger({message: 'El CIF del cliente es obligatorio', useNativeToast: true, duration: 2000});
    }else if(!await searchClientImagesRights()){
      setImagesRights([]);
      notification.danger({message: 'No se ha encontrado ningún derecho', useNativeToast: true, duration: 2000});
    }
  }

  const searchClientImagesRights = async() => {
    let result = false;
    await fetch(petitions.get_client_images_rights_local, {
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
          setImagesRights(responseJson.imagesRights);
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  }


  const getInvoiceImagesRights = async() => {
    setBudgetReference("");
    setBudgetNumber("");
    setClientCIF("");
    if(!invoiceNumber){
      notification.danger({message: 'El número de factura es obligatorio', useNativeToast: true, duration: 2000});
    }else if(!await searchInvoiceImagesRights()){
      setImagesRights([]);
      notification.danger({message: 'No se ha encontrado ningún derecho', useNativeToast: true, duration: 2000});
    }
  }

  const searchInvoiceImagesRights = async() => {
    let result = false;
    await fetch(petitions.get_invoice_images_rights_local, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        invoiceNumber: invoiceNumber
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {
          setImagesRights(responseJson.imagesRights);
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  }

  const getAllImagesRights = async() => {
    setBudgetReference("");
    setBudgetNumber("");
    setClientCIF("");
    setInvoiceNumber("");
    if(!await getAllImagesRightsFromDDBB()){
      setImagesRights([]);
      notification.danger({message: 'No se ha encontrado ningún derecho', useNativeToast: true, duration: 2000});
    }
  }

  const getAllImagesRightsFromDDBB = async() => {
    let result = false;
    await fetch(petitions.get_all_images_rights_local, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code === 200) {
          setImagesRights(responseJson.imagesRights);
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  }

  const getImagesRightsByStatus = async(status) => {
    setBudgetReference("");
    setBudgetNumber("");
    setClientCIF("");
    setInvoiceNumber("");
    if(!await searchImagesRightsbyStatus(status)){
      setImagesRights([]);
      notification.danger({message: 'No se ha encontrado ningún derecho', useNativeToast: true, duration: 2000});
    }
  }
  
  const searchImagesRightsbyStatus = async(status) => {
    let result = false;
    await fetch(petitions.get_images_rights_by_status_local, {
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
          setImagesRights(responseJson.imagesRights);
          result = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
      return result;
  }

  useEffect(() => {
    if(imagesRights[0]){
      if(imagesRights.length === 1){
        notification.success({message: `Se ha encontrado ${imagesRights.length} derecho`, useNativeToast: true, duration: 2000});
      }else{
        notification.success({message: `Se han encontrado ${imagesRights.length} derechos`, useNativeToast: true, duration: 2000});
      }
    }
  }, [imagesRights]);

  useEffect(() => {
    if(imageRightsEdited === undefined){
      setImagesRights([]);
    }
  }, [imageRightsEdited]);

  return (
    <View>
      <View>
        <Text>Consultar los derechos imagen de un presupuesto:</Text>
        <TextInput value={budgetReference} style={styles.input} placeholder="Referencia presupuesto" onChangeText={setBudgetReference}></TextInput>
        <TextInput value={budgetNumber} style={styles.input} placeholder="Número presupuesto" onChangeText={setBudgetNumber}></TextInput>
        <Button title="Consultar" color={colors.black} onPress={() => {getBudgetImagesRights()}} />
      </View>
      <View>
        <Text>Consultar los derechos imagen de un cliente:</Text>
        <TextInput value={clientCIF} style={styles.input} placeholder="CIF cliente" onChangeText={(cif) => {setClientCIF(cif)}}></TextInput>
        <Button title="Consultar" color={colors.black} onPress={() => {getClientImagesRights()}} />
      </View>
      <View>
        <Text>Consultar los derechos imagen de una factura:</Text>
        <TextInput value={invoiceNumber} style={styles.input} placeholder="Número factura" onChangeText={setInvoiceNumber}></TextInput>
        <Button title="Consultar" color={colors.black} onPress={() => {getInvoiceImagesRights()}} />
      </View>
      <View>
        <Text>Consultar los derechos imagen por categoría:</Text>
        <View style={styles.buttonRowView}>
          <Button title="Todos" color={colors.primary} onPress={()=>{getAllImagesRights()}} />
          <Button title="En curso" color={colors.primary} onPress={()=>{getImagesRightsByStatus("in progress")}} />
          <Button title="Caducados" color={colors.primary} onPress={()=>{getImagesRightsByStatus("expired")}} />
        </View>
      </View>
      <View>
      {imagesRights.map((imageRights, index) => {
            return (
            <View key={index}>
              <Text>{index+1}:
                <Text>{imageRights.agency_name}
                  <Text>{imageRights.model_name}
                    <Button title="Editar" color={colors.black} onPress={() => {editImageRights(imageRights)}}/>
                    <Button title="Borrar" color={colors.red} onPress={() => {deleteImageRights(imageRights.id)}} />
                  </Text>
                </Text>
              </Text>
            </View>
            )
          })}
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
  }
});
export default ImagesRightsScreen;
