import React from "react";

import { ScrollView, Text, View } from "react-native";

import BarraSuperior from "../components/BarraSuperior";
import BotonPrincipal from "../components/BotonPrincipal";

import styles from "../styles/InicioScreen.styles";

const InicioScreen = ({ navigation }) => {
  const irAEscaner = () => {
    navigation.navigate("Scanner");
  };

  const seleccionarArchivo = () => {
    navigation.navigate("SeleccionarArchivo");
  };

  const irAHistorial = () => {
    navigation.navigate("Historial");
  };

  return (
    <View style={styles.container}>
      <BarraSuperior />

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>Oficialía de Partes</Text>

        <Text style={styles.descripcion}>
          Digitaliza y distribuye la documentación recibida a las áreas
          correspondientes.
        </Text>

        <Text style={styles.seccionTitulo}>Registrar documento</Text>

        <BotonPrincipal
          icono="▣"
          titulo="Escanear documento"
          descripcion="Digitaliza un documento físico utilizando la cámara."
          onPress={irAEscaner}
        />

        <BotonPrincipal
          icono="+"
          titulo="Seleccionar archivo"
          descripcion="Utiliza un documento que ya se encuentre en el dispositivo."
          onPress={seleccionarArchivo}
          secundario
        />

        <Text style={styles.seccionTitulo}>Consultas</Text>

        <BotonPrincipal
          icono="≡"
          titulo="Historial"
          descripcion="Consulta los documentos registrados desde la aplicación."
          onPress={irAHistorial}
          secundario
        />
      </ScrollView>
    </View>
  );
};

export default InicioScreen;
