import React, { useMemo, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import BarraSuperior from "../components/BarraSuperior";

import useAreas from "../hooks/useAreas";

import { useScannerContext } from "../context/ScannerContext";

import { subirArchivoApp, subirEscaneoApp } from "../api/dispersion.api";

import styles from "../styles/FormularioScreen.styles";

const FormularioScreen = ({ navigation, route }) => {
  const { paginas, limpiarPaginas } = useScannerContext();

  const { areas, cargando, error, cargarAreas } = useAreas();

  const origenDocumento = route?.params?.origenDocumento || "escaneo";

  const archivo = route?.params?.archivo || null;

  const esArchivo = origenDocumento === "archivo";

  const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);

  const [fechaLimite, setFechaLimite] = useState(null);

  const [mostrarFecha, setMostrarFecha] = useState(false);

  const [enviando, setEnviando] = useState(false);

  const formatearFechaServidor = (fecha) => {
    if (!fecha) {
      return "";
    }

    const anio = fecha.getFullYear();

    const mes = String(fecha.getMonth() + 1).padStart(2, "0");

    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
  };

  const formatearFechaVisual = (fecha) => {
    if (!fecha) {
      return "Seleccionar fecha";
    }

    return fecha.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatearTamano = (bytes) => {
    const numero = Number(bytes);

    if (!Number.isFinite(numero) || numero <= 0) {
      return "";
    }

    if (numero < 1024) {
      return `${numero} B`;
    }

    if (numero < 1024 * 1024) {
      return `${(numero / 1024).toFixed(1)} KB`;
    }

    return `${(numero / (1024 * 1024)).toFixed(2)} MB`;
  };

  const obtenerExtension = (nombre) => {
    if (!nombre) {
      return "ARCHIVO";
    }

    const partes = nombre.split(".");

    if (partes.length <= 1) {
      return "ARCHIVO";
    }

    return (partes[partes.length - 1] || "ARCHIVO").toUpperCase();
  };

  const obtenerIdArea = (area) => {
    return Number(area.id ?? area.id_area);
  };

  const obtenerNombreArea = (area) => {
    return area.nombre_area || area.nombre || `Área ${obtenerIdArea(area)}`;
  };

  const estaSeleccionada = (area) => {
    const idArea = obtenerIdArea(area);

    return areasSeleccionadas.includes(idArea);
  };

  const cambiarSeleccionArea = (area) => {
    if (enviando) {
      return;
    }

    const idArea = obtenerIdArea(area);

    if (!Number.isInteger(idArea) || idArea <= 0) {
      return;
    }

    setAreasSeleccionadas((actuales) => {
      if (actuales.includes(idArea)) {
        return actuales.filter((id) => id !== idArea);
      }

      return [...actuales, idArea];
    });
  };

  const fechaMinima = useMemo(() => new Date(), []);

  const cambiarFecha = (event, fechaSeleccionada) => {
    if (Platform.OS === "android") {
      setMostrarFecha(false);
    }

    if (event?.type === "dismissed") {
      return;
    }

    if (fechaSeleccionada) {
      setFechaLimite(fechaSeleccionada);
    }
  };

  const validarFormulario = () => {
    if (esArchivo) {
      if (!archivo?.uri) {
        Alert.alert(
          "Documento no disponible",

          "No se encontró el archivo seleccionado.",
        );

        return false;
      }
    } else if (!Array.isArray(paginas) || paginas.length === 0) {
      Alert.alert(
        "Documento no disponible",

        "No se encontraron páginas escaneadas.",
      );

      return false;
    }

    if (!fechaLimite) {
      Alert.alert(
        "Fecha límite",

        "Selecciona la fecha límite del documento.",
      );

      return false;
    }

    if (areasSeleccionadas.length === 0) {
      Alert.alert(
        "Áreas destino",

        "Selecciona al menos un área destino.",
      );

      return false;
    }

    return true;
  };

  const enviarDocumento = async () => {
    if (enviando || !validarFormulario()) {
      return;
    }

    try {
      setEnviando(true);

      const destinos = areasSeleccionadas;

      const fecha = formatearFechaServidor(fechaLimite);

      let resultado;

      if (esArchivo) {
        resultado = await subirArchivoApp({
          archivo,

          fechaLimite: fecha,

          destinos,
        });
      } else {
        resultado = await subirEscaneoApp({
          paginas,

          fechaLimite: fecha,

          destinos,
        });

        limpiarPaginas();
      }

      Alert.alert(
        "Documento enviado",

        "El documento fue registrado y dispersado correctamente.",

        [
          {
            text: "Aceptar",

            onPress: () => {
              navigation.reset({
                index: 0,

                routes: [
                  {
                    name: "Inicio",
                  },
                ],
              });
            },
          },
        ],
      );

      console.log("Dispersión registrada:", resultado);
    } catch (error) {
      console.error("Error al enviar documento:", error);

      Alert.alert(
        "No fue posible enviar el documento",

        error?.message || "Ocurrió un error al registrar la dispersión.",
      );
    } finally {
      setEnviando(false);
    }
  };

  const nombreDocumento = esArchivo
    ? archivo?.name || "Archivo seleccionado"
    : "Documento escaneado";

  const detalleDocumento = esArchivo
    ? [obtenerExtension(archivo?.name), formatearTamano(archivo?.size)]
        .filter(Boolean)
        .join(" · ")
    : `PDF · ${paginas.length} ${paginas.length === 1 ? "página" : "páginas"}`;

  return (
    <View style={styles.container}>
      <BarraSuperior titulo="Registrar documento" />

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.regresar}
          onPress={() => navigation.goBack()}
          disabled={enviando}
        >
          <Text style={styles.regresarTexto}>‹ Regresar</Text>
        </Pressable>

        <Text style={styles.titulo}>Datos del documento</Text>

        <Text style={styles.descripcion}>
          Selecciona las áreas que recibirán el documento y establece su fecha
          límite.
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>Archivo</Text>

          <Text style={styles.archivoNombre} numberOfLines={2}>
            {nombreDocumento}
          </Text>

          <Text style={styles.archivoDetalle}>{detalleDocumento}</Text>
        </View>

        <Text style={styles.seccion}>Fecha límite</Text>

        <Pressable
          style={styles.selectorFecha}
          onPress={() => setMostrarFecha(true)}
          disabled={enviando}
        >
          <Text
            style={[
              styles.selectorFechaTexto,

              !fechaLimite && styles.selectorFechaPlaceholder,
            ]}
          >
            {formatearFechaVisual(fechaLimite)}
          </Text>

          <Text style={styles.fechaIcono}>▾</Text>
        </Pressable>

        {mostrarFecha && (
          <DateTimePicker
            value={fechaLimite || fechaMinima}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            minimumDate={fechaMinima}
            onChange={cambiarFecha}
          />
        )}

        <View style={styles.seccionCabecera}>
          <Text style={styles.seccion}>Áreas destino</Text>

          {areasSeleccionadas.length > 0 && (
            <Text style={styles.totalSeleccionadas}>
              {areasSeleccionadas.length} seleccionada
              {areasSeleccionadas.length !== 1 ? "s" : ""}
            </Text>
          )}
        </View>

        {cargando ? (
          <View style={styles.cargandoContainer}>
            <ActivityIndicator />

            <Text style={styles.informacion}>Consultando áreas...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>

            <Pressable onPress={cargarAreas} style={styles.reintentar}>
              <Text style={styles.reintentarTexto}>Reintentar</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.listaAreas}>
            {areas.map((area) => {
              const idArea = obtenerIdArea(area);

              const seleccionada = estaSeleccionada(area);

              return (
                <Pressable
                  key={idArea}
                  style={[styles.area, seleccionada && styles.areaSeleccionada]}
                  onPress={() => cambiarSeleccionArea(area)}
                  disabled={enviando}
                >
                  <View
                    style={[
                      styles.checkbox,

                      seleccionada && styles.checkboxSeleccionado,
                    ]}
                  >
                    {seleccionada && (
                      <Text style={styles.checkboxMarca}>✓</Text>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.areaNombre,

                      seleccionada && styles.areaNombreSeleccionada,
                    ]}
                  >
                    {obtenerNombreArea(area)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <Pressable
          style={[styles.botonEnviar, enviando && styles.botonDeshabilitado]}
          onPress={enviarDocumento}
          disabled={enviando}
        >
          {enviando ? (
            <View style={styles.enviandoContainer}>
              <ActivityIndicator size="small" color="#ffffff" />

              <Text style={styles.botonEnviarTexto}>Enviando documento...</Text>
            </View>
          ) : (
            <Text style={styles.botonEnviarTexto}>Enviar documento</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default FormularioScreen;
