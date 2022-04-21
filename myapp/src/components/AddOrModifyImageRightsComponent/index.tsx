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
import { store } from "../../redux/store";
import { updateImageRights } from "../../redux/slices/imagesRightsSlice";
import { petitions } from "../../constants/petitions";

const AddOrModifyImageRightsComponent = ({ navigation }) => {
  const imageRightsToEdit = useSelector((state) => state?.imageRights).imageRights;
  const [agencyName, setAgencyName] = useState("");
  const [modelName, setModelName] = useState("");
  const [campaign, setCampaign] = useState("");
  const [rightsDuration, setRightsDuration] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState(new Date());
  const [campaignEndDate, setCampaignEndDate] = useState(new Date());
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [rightsAmount, setRightsAmount] = useState("");
  const [rightsRenewalAmount, setRightsRenewalAmount] = useState("");

  const addImageRights = async() => {
    if(!agencyName){
      notification.danger({message: 'El campo agencia modelos es obligatorio', useNativeToast: true, duration: 2000});
    }else if(!modelName){
      notification.danger({message: 'El campo nombre modelo es obligatorio', useNativeToast: true, duration: 2000});
    }else{
      if(imageRightsToEdit){
        if(await updateImageRightsIntoDDBB()){
          notification.success({message: 'Derechos modificados correctamente', useNativeToast: true, duration: 2000});
        }else{
          notification.danger({message: 'No se ha podido actualizar los derechos', useNativeToast: true, duration: 2000});
        }
        store.dispatch(updateImageRights({imageRights: undefined}));
        navigation.goBack();
      }else{
        const newImageRights = getObjectImageRights();
        setImageRightsValues(resetValuesImageRights());
        if(_.get(route, 'params.modifyImageRights.index') >= 0){
          notification.success({message: 'Derechos modificados correctamente', useNativeToast: true, duration: 2000});
          navigation.navigate("AddBudgetScreen", {modifiendImageRights: {index: _.get(route, 'params.modifiendImageRights.index'), newImageRights: newImageRights}});
        }else{
          notification.success({message: 'Derechos agregados correctamente', useNativeToast: true, duration: 2000});
          navigation.navigate("AddBudgetScreen", {newImageRights: newImageRights});
        }
      }
    }
  };

  const updateImageRightsIntoDDBB = async() => {
    let result = false;
    await fetch(petitions.update_image_rights, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        imageRights: {
          id: imageRightsToEdit.id,
          agencyName: agencyName.trim(),
          modelName: modelName.trim(),
          campaign: campaign.trim(),
          rightsDuration: rightsDuration.trim(),
          campaignStartDate: formatDate(campaignStartDate),
          campaignEndDate: formatDate(campaignEndDate),
          invoiceNumber: invoiceNumber.trim(),
          rightsAmount: rightsAmount.trim(),
          rightsRenewalAmount: rightsRenewalAmount.trim(),
        }
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

  const formatDate = (date: Date) :string => {
    let result = "";
    if(date){
      result = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    return result;
  }

  const getObjectImageRights = () => {
    return {
      agencyName: agencyName.trim(),
      modelName: modelName.trim(),
      campaign: campaign.trim(),
      rightsDuration: rightsDuration.trim(),
      campaignStartDate: campaignStartDate,
      campaignEndDate: campaignEndDate,
      invoiceNumber: invoiceNumber.trim(),
      rightsAmount: rightsAmount.trim(),
      rightsRenewalAmount: rightsRenewalAmount.trim(),
    }
  }

  const resetValuesImageRights = () => {
    return {
      agencyName: "",
      modelName: "",
      campaign: "",
      rightsDuration: "",
      campaignStartDate: new Date(),
      campaignEndDate: new Date(),
      invoiceNumber: "",
      rightsAmount: "",
      rightsRenewalAmount: "",
    }
  }

  const setImageRightsValues = (imageRights) => {
      setAgencyName(imageRights.agencyName);
      setModelName(imageRights.modelName);
      setCampaign(imageRights.campaign);
      setRightsDuration(imageRights.rightsDuration);
      setCampaignStartDate(imageRights.campaignStartDate);
      setCampaignEndDate(imageRights.campaignEndDate);
      setInvoiceNumber(imageRights.invoiceNumber);
      setRightsAmount(imageRights.rightsAmount);
      setRightsRenewalAmount(imageRights.rightsRenewalAmount);
  }

  const route = useRoute()
  const modifyImageRights = _.get(route, 'params.modifyImageRights.imageRights');
  if(modifyImageRights){
    setImageRightsValues(modifyImageRights);
    _.set(route, 'params.modifyImageRights.imageRights', null);
  }

  useEffect(() => {
    if(imageRightsToEdit){
      setImageRightsValues({
        agencyName: imageRightsToEdit.agency_name,
        modelName: imageRightsToEdit.model_name,
        campaign: imageRightsToEdit.campaign,
        rightsDuration: imageRightsToEdit.rights_duration,
        campaignStartDate: new Date(imageRightsToEdit.campaign_start_date),
        campaignEndDate: new Date(imageRightsToEdit.campaign_end_date),
        invoiceNumber: imageRightsToEdit.invoice_number,
        rightsAmount: imageRightsToEdit.rights_amount,
        rightsRenewalAmount: imageRightsToEdit.rights_renewal_amount,
      });
    }
  }, [imageRightsToEdit]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container}>
            <Text>Agencia modelos:</Text>
            <TextInput value={agencyName} style={styles.input} placeholder="Agencia modelos" onChangeText={setAgencyName}></TextInput>
            <Text>Nombre modelo:</Text>
            <TextInput value={modelName} style={styles.input} placeholder="Nombre modelo" onChangeText={setModelName}></TextInput>
            <Text>Campaña:</Text>
            <TextInput value={campaign} style={styles.input} placeholder="Campaña" onChangeText={setCampaign}></TextInput>
            <Text>Tiempo derechos:</Text>
            <TextInput value={rightsDuration} style={styles.input} placeholder="Tiempo derechos" onChangeText={setRightsDuration}></TextInput>
            <Text>Inicio camapaña:</Text>
            <DatePicker value={campaignStartDate} onChange={setCampaignStartDate}
              style={{width: "100%"}}
              placeholder="Selecciona la fecha" format="yyyy-mm-dd"/>
            <Text>Final camapaña:</Text>
            <DatePicker value={campaignEndDate} onChange={setCampaignEndDate}
              style={{width: "100%"}}
              placeholder="Selecciona la fecha" format="yyyy-mm-dd"/>            <Text>Proveedor:</Text>
            <Text>Número factura:</Text>
            <TextInput value={invoiceNumber} style={styles.input} placeholder="Número factura" onChangeText={setInvoiceNumber}></TextInput>
            <Text>Importe derechos:</Text>
            <TextInput value={rightsAmount} style={styles.input} placeholder="Importe derechos" onChangeText={setRightsAmount}></TextInput>
            <Text>Importe renovación:</Text>
            <TextInput value={rightsRenewalAmount} style={styles.input} placeholder="Importe renovación" onChangeText={setRightsRenewalAmount}></TextInput>
            <Button title="Actualizar presupuesto" color={colors.primary} onPress={addImageRights}/>
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

export default AddOrModifyImageRightsComponent;
