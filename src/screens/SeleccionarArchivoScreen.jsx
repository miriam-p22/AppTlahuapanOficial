import React, { useState } from "react";

import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

import { File } from "expo-file-system";

import BarraSuperior from "../components/BarraSuperior";

import styles from "../styles/SeleccionarArchivoScreen.styles";

const SeleccionarArchivoScreen = ({ navigation }) => {
  const [seleccionando, setSeleccionando] = useState(false);

  const seleccionarArchivo = async () => {
    if (seleccionando) {
      return;
    }

    try {
      setSeleccionando(true);

      const resultado = await File.pickFileAsync({
        mimeTypes: [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
      });

      let archivo = null;

      if (resultado?.canceled === true) {
        return;
      }

      if (resultado?.canceled === false && resultado?.result) {
        archivo = Array.isArray(resultado.result)
          ? resultado.result[0]
          : resultado.result;
      } else {
        archivo = Array.isArray(resultado) ? resultado[0] : resultado;
      }

      if (!archivo?.uri) {
        return;
      }

      console.log("Archivo seleccionado:", archivo.uri);

      console.log("Nombre:", archivo.name);

      console.log("Tipo:", archivo.type);

      console.log("Tamaño:", archivo.size);

      navigation.navigate("Formulario", {
        origenDocumento: "archivo",

        archivo: {
          uri: archivo.uri,

          name: archivo.name || "documento",

          mimeType: archivo.type || "application/octet-stream",

          size: archivo.size || null,
        },
      });
    } catch (error) {
      
      const mensaje = String(error?.message || "");

      if (mensaje.toLowerCase().includes("cancel")) {
        return;
      }

      console.error("Error al seleccionar archivo:", error);

      Alert.alert(
        "No fue posible seleccionar el archivo",

        error?.message ||
          "Ocurrió un error al abrir el selector de documentos.",
      );
    } finally {
      setSeleccionando(false);
    }
  };

  return (
    <View style={styles.container}>
      <BarraSuperior titulo="Seleccionar archivo" />

      <View style={styles.contenido}>
        <Pressable
          style={styles.regresar}
          onPress={() => navigation.goBack()}
          disabled={seleccionando}
        >
          <Text style={styles.regresarTexto}>‹ Regresar</Text>
        </Pressable>

        <Pressable
          style={[styles.tarjeta, seleccionando && styles.tarjetaDeshabilitada]}
          onPress={seleccionarArchivo}
          disabled={seleccionando}
        >
          {seleccionando ? (
            <>
              <ActivityIndicator />

              <Text style={styles.titulo}>Abriendo archivos</Text>

              <Text style={styles.descripcion}>Espera un momento...</Text>
            </>
          ) : (
            <>
              <Text style={styles.icono}>+</Text>

              <Text style={styles.titulo}>Seleccionar documento</Text>

              <Text style={styles.descripcion}>
                Selecciona un archivo existente en el dispositivo para
                registrarlo y dispersarlo.
              </Text>

              <View style={styles.formatos}>
                <Text style={styles.formatosTexto}>
                  PDF · JPG · PNG · DOC · DOCX
                </Text>
              </View>

              <View style={styles.botonSeleccionar}>
                <Text style={styles.botonSeleccionarTexto}>Buscar archivo</Text>
              </View>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default SeleccionarArchivoScreen;
