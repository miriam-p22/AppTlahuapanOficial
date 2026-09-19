import React from "react";

import { Image, Text, View } from "react-native";

import styles from "../styles/BarraSuperior.styles";

const BarraSuperior = ({ titulo = "Municipio de Tlahuapan" }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.textos}>
        <Text style={styles.nombre}>Gestión Documental</Text>

        <Text style={styles.titulo}>{titulo}</Text>
      </View>
    </View>
  );
};

export default BarraSuperior;
