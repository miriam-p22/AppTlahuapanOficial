import React, { useEffect } from "react";

import { Image, Text, View } from "react-native";

import styles from "../styles/SplashScreen.styles";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const temporizador = setTimeout(() => {
      navigation.replace("Inicio");
    }, 2000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.titulo}>Gestión Documental</Text>

      <Text style={styles.subtitulo}>Oficialía de Partes</Text>
    </View>
  );
};

export default SplashScreen;
