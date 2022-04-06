import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { colors } from "../../constants/palette";
import { useNavigation } from "@react-navigation/core";
import { Image } from 'react-native';

const SplashScreen: () => JSX.Element = () => {
  const navigation = useNavigation();
  const navigateLogin = () => {
    navigation.navigate("LoginScreen");
  };
  const navigateRegister = () => {
    navigation.navigate("RegisterScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={require('../../../assets/logo.jpg')} />
        <Text style={styles.upperHeader}>Bienvenido a</Text>
        <Text style={styles.lowerHeader}>GSG Producciones</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <Button title="Login" color={colors.primary} onPress={navigateLogin} />
        </View>
        <View style={styles.registerBtn}>
          <Button title="Register" color={colors.black} onPress={navigateRegister} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 180,
    height: 180,
    borderRadius: 30,
    marginBottom: 15
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: '35%'
  },
  upperHeader: {
    fontSize: 32,
  },
  lowerHeader: {
    fontSize: 36,
  },
  bodyContainer: {
    margin: 20,
    marginTop: '30%',
  },
  registerBtn: {
    marginTop: '2%',
  },
});
export default SplashScreen;
