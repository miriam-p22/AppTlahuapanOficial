import React, { useRef, useState } from "react";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";

import { useScannerContext } from "../context/ScannerContext";

import styles from "../styles/ScannerScreen.styles";

const ScannerScreen = ({ navigation }) => {
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [capturando, setCapturando] = useState(false);

  const [camaraLista, setCamaraLista] = useState(false);

  const { paginas, agregarPagina } = useScannerContext();

  const capturarDocumento = async () => {
    if (!cameraRef.current || !camaraLista || capturando) {
      return;
    }

    try {
      setCapturando(true);

      const foto = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        skipProcessing: false,
      });

      if (!foto?.uri) {
        return;
      }

      agregarPagina({
        uri: foto.uri,
        width: foto.width,
        height: foto.height,
      });

      navigation.navigate("Preview");
    } catch (error) {
      console.error("Error al capturar documento:", error);
    } finally {
      setCapturando(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.estadoContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.estadoTexto}>Verificando permiso de cámara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.estadoContainer}>
        <Text style={styles.permisoTitulo}>Acceso a la cámara</Text>

        <Text style={styles.permisoDescripcion}>
          La aplicación necesita acceso a la cámara para digitalizar los
          documentos recibidos.
        </Text>

        <Pressable style={styles.botonPermiso} onPress={requestPermission}>
          <Text style={styles.botonPermisoTexto}>Permitir cámara</Text>
        </Pressable>

        <Pressable
          style={styles.botonCancelar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.botonCancelarTexto}>Regresar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          mode="picture"
          onCameraReady={() => {
            setCamaraLista(true);
          }}
        />
      </View>

      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.superior}>
          <Pressable
            style={styles.botonSuperior}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.botonSuperiorTexto}>‹ Regresar</Text>
          </Pressable>

          <View style={styles.contador}>
            <Text style={styles.contadorTexto}>
              {paginas.length} {paginas.length === 1 ? "página" : "páginas"}
            </Text>
          </View>
        </View>

        <View style={styles.centro} pointerEvents="none" />

        <View style={styles.inferior}>
          <Text style={styles.ayuda}>
            Mantén el teléfono estable y evita sombras sobre la hoja.
          </Text>

          <Pressable
            style={[
              styles.botonCaptura,
              (!camaraLista || capturando) && styles.botonCapturaDeshabilitado,
            ]}
            onPress={capturarDocumento}
            disabled={!camaraLista || capturando}
          >
            <View style={styles.botonCapturaInterior} />
          </Pressable>

          <Text style={styles.escanearTexto}>
            {capturando ? "Capturando..." : "Escanear"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ScannerScreen;
