import React, { useCallback, useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import BarraSuperior from "../components/BarraSuperior";

import { obtenerHistorialApp } from "../api/dispersion.api";

import styles from "../styles/HistorialScreen.styles";

const HistorialScreen = ({ navigation }) => {
  const [historial, setHistorial] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [actualizando, setActualizando] = useState(false);

  const [error, setError] = useState("");

  const cargarHistorial = useCallback(async (esActualizacion = false) => {
    try {
      if (esActualizacion) {
        setActualizando(true);
      } else {
        setCargando(true);
      }

      setError("");

      const datos = await obtenerHistorialApp();

      setHistorial(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error("Error al cargar historial:", error);

      setError(error?.message || "No fue posible consultar el historial.");
    } finally {
      setCargando(false);

      setActualizando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [cargarHistorial]),
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

  const obtenerFechaLimite = (dispersion) => {
    const destinos = Array.isArray(dispersion?.destinos)
      ? dispersion.destinos
      : [];

    const fechas = destinos
      .map((destino) => destino?.fecha_limite)
      .filter(Boolean);

    if (fechas.length === 0) {
      return "Sin fecha";
    }

    return formatearFecha(fechas[0]);
  };

  const obtenerAreas = (dispersion) => {
    const destinos = Array.isArray(dispersion?.destinos)
      ? dispersion.destinos
      : [];

    return destinos
      .map((destino) => destino?.area?.nombre_area)
      .filter(Boolean);
  };

  const obtenerEstado = (dispersion) => {
    const destinos = Array.isArray(dispersion?.destinos)
      ? dispersion.destinos
      : [];

    if (destinos.length === 0) {
      return "Sin destino";
    }

    const estados = [
      ...new Set(
        destinos.map((destino) => destino?.estado_documento).filter(Boolean),
      ),
    ];

    if (estados.length === 1) {
      return estados[0];
    }

    if (estados.length > 1) {
      return "Varios estados";
    }

    return "Sin estado";
  };

  const obtenerEstadoEnvio = (dispersion) => {
    const destinos = Array.isArray(dispersion?.destinos)
      ? dispersion.destinos
      : [];

    if (destinos.length === 0) {
      return {
        texto: "Sin destinos",
        enviado: false,
      };
    }

    const todosEnviados = destinos.every(
      (destino) =>
        String(destino?.estado_envio || "").toLowerCase() === "enviado",
    );

    if (todosEnviados) {
      return {
        texto: "Enviado",
        enviado: true,
      };
    }

    return {
      texto: "Pendiente de envío",
      enviado: false,
    };
  };

  const capitalizar = (texto) => {
    const valor = String(texto || "").trim();

    if (!valor) {
      return "";
    }

    return valor.charAt(0).toUpperCase() + valor.slice(1);
  };

  const abrirDetalle = (dispersion) => {
    navigation.navigate("DetalleHistorial", {
      dispersion,
    });
  };

  const renderContenido = () => {
    if (cargando) {
      return (
        <View style={styles.estadoContainer}>
          <ActivityIndicator size="large" />

          <Text style={styles.estadoTexto}>Consultando historial...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.estadoContainer}>
          <Text style={styles.errorTitulo}>
            No fue posible cargar el historial
          </Text>

          <Text style={styles.errorTexto}>{error}</Text>

          <Pressable
            style={styles.botonReintentar}
            onPress={() => cargarHistorial()}
          >
            <Text style={styles.botonReintentarTexto}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }

    if (historial.length === 0) {
      return (
        <View style={styles.estadoContainer}>
          <Text style={styles.vacioTitulo}>Sin documentos</Text>

          <Text style={styles.estadoTexto}>
            Todavía no existen documentos registrados desde la aplicación móvil.
          </Text>
        </View>
      );
    }

    return historial.map((dispersion) => {
      const areas = obtenerAreas(dispersion);

      const estado = obtenerEstado(dispersion);

      const estadoEnvio = obtenerEstadoEnvio(dispersion);

      const tamano = formatearTamano(dispersion?.tamano_archivo);

      return (
        <Pressable
          key={dispersion.id}
          style={styles.tarjeta}
          onPress={() => abrirDetalle(dispersion)}
        >
          <View style={styles.tarjetaCabecera}>
            <View style={styles.archivoInfo}>
              <Text style={styles.archivoNombre} numberOfLines={2}>
                {dispersion.nombre_archivo || "Documento"}
              </Text>

              <Text style={styles.archivoMeta}>
                {[
                  dispersion.extension
                    ? String(dispersion.extension).toUpperCase()
                    : null,

                  tamano || null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </Text>
            </View>

            <View style={styles.estadoBadge}>
              <Text style={styles.estadoBadgeTexto}>{capitalizar(estado)}</Text>
            </View>
          </View>

          <View style={styles.separador} />

          <View style={styles.filaDato}>
            <Text style={styles.datoEtiqueta}>Registro</Text>

            <Text style={styles.datoValor}>
              {formatearFechaHora(dispersion.fecha_recepcion)}
            </Text>
          </View>

          <View style={styles.filaDato}>
            <Text style={styles.datoEtiqueta}>Fecha límite</Text>

            <Text style={styles.datoValor}>
              {obtenerFechaLimite(dispersion)}
            </Text>
          </View>

          <View style={styles.filaDato}>
            <Text style={styles.datoEtiqueta}>Transferencia</Text>

            <Text
              style={
                estadoEnvio.enviado
                  ? styles.estadoEnvioExitoso
                  : styles.estadoEnvioPendiente
              }
            >
              {estadoEnvio.texto}
            </Text>
          </View>

          <View style={styles.destinosContainer}>
            <Text style={styles.datoEtiqueta}>
              {areas.length === 1 ? "Área destino" : "Áreas destino"}
            </Text>

            {areas.length > 0 ? (
              areas.map((area, index) => (
                <View key={`${dispersion.id}-${index}`} style={styles.areaFila}>
                  <View style={styles.areaPunto} />

                  <Text style={styles.areaTexto}>{area}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.sinDestinos}>Sin áreas registradas</Text>
            )}
          </View>

          <Text style={styles.verDetalle}>Ver detalle ›</Text>
        </Pressable>
      );
    });
  };

  return (
    <View style={styles.container}>
      <BarraSuperior titulo="Historial" />

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={actualizando}
            onRefresh={() => cargarHistorial(true)}
          />
        }
      >
        <Pressable style={styles.regresar} onPress={() => navigation.goBack()}>
          <Text style={styles.regresarTexto}>‹ Regresar</Text>
        </Pressable>

        <Text style={styles.titulo}>Historial de documentos</Text>

        <Text style={styles.descripcion}>
          Documentos registrados desde la aplicación móvil.
        </Text>

        <View style={styles.resumen}>
          <Text style={styles.resumenNumero}>{historial.length}</Text>

          <Text style={styles.resumenTexto}>
            {historial.length === 1
              ? "documento registrado"
              : "documentos registrados"}
          </Text>
        </View>

        {renderContenido()}
      </ScrollView>
    </View>
  );
};

export default HistorialScreen;
