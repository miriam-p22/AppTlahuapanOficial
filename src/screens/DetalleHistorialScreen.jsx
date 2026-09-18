import React, { useMemo, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import * as WebBrowser from "expo-web-browser";

import BarraSuperior from "../components/BarraSuperior";

import styles from "../styles/DetalleHistorialScreen.styles";

const API_URL = String(process.env.EXPO_PUBLIC_API_URL || "")
  .trim()
  .replace(/\/+$/, "");

const DetalleHistorialScreen = ({ navigation, route }) => {
  const dispersion = route?.params?.dispersion;

  const [abriendo, setAbriendo] = useState(false);

  const destinos = useMemo(
    () => (Array.isArray(dispersion?.destinos) ? dispersion.destinos : []),
    [dispersion],
  );

  const formatearFecha = (valor) => {
    if (!valor) {
      return "Sin fecha";
    }

    const fecha = new Date(valor);

    if (Number.isNaN(fecha.getTime())) {
      return "Sin fecha";
    }

    return fecha.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatearFechaHora = (valor) => {
    if (!valor) {
      return "Sin fecha";
    }

    const fecha = new Date(valor);

    if (Number.isNaN(fecha.getTime())) {
      return "Sin fecha";
    }

    return fecha.toLocaleString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearTamano = (bytes) => {
    const numero = Number(bytes);

    if (!Number.isFinite(numero) || numero < 0) {
      return "Sin información";
    }

    if (numero < 1024) {
      return `${numero} B`;
    }

    if (numero < 1024 * 1024) {
      return `${(numero / 1024).toFixed(1)} KB`;
    }

    return `${(numero / (1024 * 1024)).toFixed(2)} MB`;
  };

  const capitalizar = (texto) => {
    const valor = String(texto || "").trim();

    if (!valor) {
      return "Sin información";
    }

    return valor.charAt(0).toUpperCase() + valor.slice(1);
  };

  const obtenerNombreArea = (destino) => {
    return destino?.area?.nombre_area || `Área ${destino?.id_area || ""}`;
  };

  const obtenerRutaArchivo = () => {
    const ruta = String(dispersion?.archivo || "")
      .trim()
      .replace(/\\/g, "/");

    if (!ruta) {
      return "";
    }

    if (/^https?:\/\//i.test(ruta)) {
      return ruta;
    }

    return `${API_URL}/${ruta.replace(/^\/+/, "")}`;
  };

  const abrirArchivo = async () => {
    if (abriendo) {
      return;
    }

    const url = obtenerRutaArchivo();

    if (!url) {
      Alert.alert(
        "Archivo no disponible",
        "Este registro no tiene un archivo asociado.",
      );

      return;
    }

    try {
      setAbriendo(true);

      console.log("Abriendo archivo:", url);

      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.error("Error al abrir archivo:", error);

      Alert.alert(
        "No fue posible abrir el archivo",
        error?.message || "No fue posible visualizar el documento.",
      );
    } finally {
      setAbriendo(false);
    }
  };

  const todosEnviados =
    destinos.length > 0 &&
    destinos.every(
      (destino) =>
        String(destino?.estado_envio || "").toLowerCase() === "enviado",
    );

  const pendientes = destinos.filter(
    (destino) =>
      String(destino?.estado_envio || "").toLowerCase() !== "enviado",
  ).length;

  if (!dispersion) {
    return (
      <View style={styles.container}>
        <BarraSuperior titulo="Detalle" />

        <View style={styles.sinDocumento}>
          <Text style={styles.sinDocumentoTitulo}>Documento no disponible</Text>

          <Pressable
            style={styles.botonPrincipal}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.botonPrincipalTexto}>Regresar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarraSuperior titulo="Detalle" />

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.regresar} onPress={() => navigation.goBack()}>
          <Text style={styles.regresarTexto}>‹ Regresar</Text>
        </Pressable>

        <Text style={styles.titulo}>Detalle del documento</Text>

        <View style={styles.tarjetaArchivo}>
          <Text style={styles.archivoNombre}>
            {dispersion.nombre_archivo || "Documento"}
          </Text>

          <Text style={styles.archivoMeta}>
            {[
              dispersion.extension
                ? String(dispersion.extension).toUpperCase()
                : null,

              formatearTamano(dispersion.tamano_archivo),
            ]
              .filter(Boolean)
              .join(" · ")}
          </Text>

          <Pressable
            style={[
              styles.botonPrincipal,

              abriendo && styles.botonDeshabilitado,
            ]}
            onPress={abrirArchivo}
            disabled={abriendo}
          >
            {abriendo ? (
              <View style={styles.botonContenido}>
                <ActivityIndicator size="small" color="#ffffff" />

                <Text style={styles.botonPrincipalTexto}>Abriendo...</Text>
              </View>
            ) : (
              <Text style={styles.botonPrincipalTexto}>Abrir archivo</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.resumenEstado}>
          <Text style={styles.resumenEstadoTitulo}>
            Estado de transferencia
          </Text>

          <Text
            style={[
              styles.resumenEstadoValor,

              todosEnviados ? styles.estadoEnviado : styles.estadoPendiente,
            ]}
          >
            {todosEnviados ? "Enviado" : "Pendiente"}
          </Text>

          <Text style={styles.resumenEstadoDescripcion}>
            {todosEnviados
              ? "El archivo ya fue enviado a todas las áreas destino."
              : `${pendientes} ${
                  pendientes === 1 ? "destino continúa" : "destinos continúan"
                } pendiente${pendientes === 1 ? "" : "s"} de transferencia.`}
          </Text>
        </View>

        <View style={styles.tarjetaDatos}>
          <View style={styles.filaDato}>
            <Text style={styles.datoEtiqueta}>Registro</Text>

            <Text style={styles.datoValor}>
              {formatearFechaHora(dispersion.fecha_recepcion)}
            </Text>
          </View>

          <View style={styles.filaDato}>
            <Text style={styles.datoEtiqueta}>Origen</Text>

            <Text style={styles.datoValor}>App móvil</Text>
          </View>

          <View style={styles.filaDato}>
            <Text style={styles.datoEtiqueta}>Tipo</Text>

            <Text style={styles.datoValor}>
              {dispersion.tipo_archivo || "Sin información"}
            </Text>
          </View>
        </View>

        <Text style={styles.seccionTitulo}>
          {destinos.length === 1 ? "Área destino" : "Áreas destino"}
        </Text>

        {destinos.length === 0 ? (
          <View style={styles.tarjetaDestino}>
            <Text style={styles.sinDestinos}>
              No existen áreas destino registradas.
            </Text>
          </View>
        ) : (
          destinos.map((destino) => {
            const enviado =
              String(destino?.estado_envio || "").toLowerCase() === "enviado";

            return (
              <View key={destino.id} style={styles.tarjetaDestino}>
                <Text style={styles.areaNombre}>
                  {obtenerNombreArea(destino)}
                </Text>

                <View style={styles.separador} />

                <View style={styles.filaDato}>
                  <Text style={styles.datoEtiqueta}>Transferencia</Text>

                  <Text
                    style={[
                      styles.datoValor,

                      enviado ? styles.estadoEnviado : styles.estadoPendiente,
                    ]}
                  >
                    {capitalizar(destino.estado_envio)}
                  </Text>
                </View>

                <View style={styles.filaDato}>
                  <Text style={styles.datoEtiqueta}>Estado del oficio</Text>

                  <Text style={styles.datoValor}>
                    {capitalizar(destino.estado_documento)}
                  </Text>
                </View>

                <View style={styles.filaDato}>
                  <Text style={styles.datoEtiqueta}>Fecha límite</Text>

                  <Text style={styles.datoValor}>
                    {formatearFecha(destino.fecha_limite)}
                  </Text>
                </View>

                <View style={styles.filaDato}>
                  <Text style={styles.datoEtiqueta}>Fecha de envío</Text>

                  <Text style={styles.datoValor}>
                    {destino.fecha_envio
                      ? formatearFechaHora(destino.fecha_envio)
                      : "Aún no enviado"}
                  </Text>
                </View>

                {destino.error_envio ? (
                  <View style={styles.errorEnvio}>
                    <Text style={styles.errorEnvioTitulo}>
                      Error de transferencia
                    </Text>

                    <Text style={styles.errorEnvioTexto}>
                      {destino.error_envio}
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default DetalleHistorialScreen;
