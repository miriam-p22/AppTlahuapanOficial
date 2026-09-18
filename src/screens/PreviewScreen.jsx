import React from "react";

import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

import { useScannerContext } from "../context/ScannerContext";

import styles from "../styles/PreviewScreen.styles";

const PreviewScreen = ({ navigation }) => {
  const { paginas, eliminarPagina, limpiarPaginas } = useScannerContext();

  const agregarOtraPagina = () => {
    navigation.navigate("Scanner");
  };

  const eliminar = (pagina) => {
    Alert.alert(
      "Eliminar página",

      "¿Deseas eliminar esta página del documento?",

      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Eliminar",
          style: "destructive",

          onPress: () => {
            eliminarPagina(pagina.id);
          },
        },
      ],
    );
  };

  const cancelarDocumento = () => {
    Alert.alert(
      "Cancelar escaneo",

      "Se eliminarán todas las páginas escaneadas.",

      [
        {
          text: "Continuar escaneando",

          style: "cancel",
        },

        {
          text: "Cancelar documento",

          style: "destructive",

          onPress: () => {
            limpiarPaginas();

            navigation.navigate("Inicio");
          },
        },
      ],
    );
  };

  const continuar = () => {
    if (paginas.length === 0) {
      Alert.alert(
        "Documento vacío",

        "Escanea al menos una página para continuar.",
      );

      return;
    }

    navigation.navigate("Formulario", {
      tipoEntrada: "scanner",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.superior}>
        <Pressable onPress={cancelarDocumento} style={styles.regresar}>
          <Text style={styles.regresarTexto}>Cancelar</Text>
        </Pressable>

        <View>
          <Text style={styles.titulo}>Revisar documento</Text>

          <Text style={styles.contador}>
            {paginas.length} {paginas.length === 1 ? "página" : "páginas"}
          </Text>
        </View>

        <View style={styles.espacio} />
      </View>

      {paginas.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.vacioTitulo}>No hay páginas</Text>

          <Text style={styles.vacioDescripcion}>
            Escanea una página para continuar.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        >
          {paginas.map((pagina, index) => (
            <View key={pagina.id} style={styles.pagina}>
              <View style={styles.paginaCabecera}>
                <Text style={styles.paginaTitulo}>Página {index + 1}</Text>

                <Pressable onPress={() => eliminar(pagina)}>
                  <Text style={styles.eliminar}>Eliminar</Text>
                </Pressable>
              </View>

              <Image
                source={{
                  uri: pagina.uri,
                }}
                style={styles.imagen}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.acciones}>
        <Pressable style={styles.botonSecundario} onPress={agregarOtraPagina}>
          <Text style={styles.botonSecundarioTexto}>+ Agregar página</Text>
        </Pressable>

        <Pressable
          style={[
            styles.botonPrincipal,

            paginas.length === 0 && styles.botonDeshabilitado,
          ]}
          onPress={continuar}
          disabled={paginas.length === 0}
        >
          <Text style={styles.botonPrincipalTexto}>Continuar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PreviewScreen;
