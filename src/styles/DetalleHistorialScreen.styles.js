import { StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contenido: {
    padding: 20,
    paddingBottom: 40,
  },

  regresar: {
    alignSelf: "flex-start",
    marginBottom: 18,
    paddingVertical: 6,
    paddingRight: 14,
  },

  regresarTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },

  titulo: {
    marginBottom: 16,

    fontSize: 21,
    fontWeight: "700",

    color: COLORS.text,
  },

  tarjetaArchivo: {
    padding: 17,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  archivoNombre: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",

    color: COLORS.text,
  },

  archivoMeta: {
    marginTop: 6,

    fontSize: 13,

    color: COLORS.textSecondary,
  },

  botonPrincipal: {
    alignItems: "center",
    justifyContent: "center",

    marginTop: 16,

    paddingVertical: 12,
    paddingHorizontal: 18,

    borderRadius: 8,

    backgroundColor: COLORS.primary,
  },

  botonPrincipalTexto: {
    fontSize: 14,
    fontWeight: "700",

    color: COLORS.white,
  },

  botonContenido: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  botonDeshabilitado: {
    opacity: 0.65,
  },

  resumenEstado: {
    marginTop: 14,

    padding: 16,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  resumenEstadoTitulo: {
    fontSize: 12,
    fontWeight: "600",

    color: COLORS.textSecondary,
  },

  resumenEstadoValor: {
    marginTop: 5,

    fontSize: 18,
    fontWeight: "700",
  },

  resumenEstadoDescripcion: {
    marginTop: 7,

    fontSize: 13,
    lineHeight: 19,

    color: COLORS.textSecondary,
  },

  estadoEnviado: {
    color: "#2e7d32",
  },

  estadoPendiente: {
    color: "#a66a00",
  },

  tarjetaDatos: {
    marginTop: 14,

    padding: 16,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  filaDato: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    marginBottom: 10,
  },

  datoEtiqueta: {
    width: "42%",

    fontSize: 12,
    fontWeight: "600",

    color: COLORS.textSecondary,
  },

  datoValor: {
    flex: 1,

    fontSize: 12,
    fontWeight: "600",

    textAlign: "right",

    color: COLORS.text,
  },

  seccionTitulo: {
    marginTop: 22,
    marginBottom: 10,

    fontSize: 17,
    fontWeight: "700",

    color: COLORS.text,
  },

  tarjetaDestino: {
    marginBottom: 12,

    padding: 16,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  areaNombre: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",

    color: COLORS.text,
  },

  separador: {
    height: 1,

    marginVertical: 13,

    backgroundColor: COLORS.border,
  },

  sinDestinos: {
    fontSize: 13,

    color: COLORS.textSecondary,
  },

  errorEnvio: {
    marginTop: 8,

    padding: 11,

    borderRadius: 8,

    backgroundColor: COLORS.background,
  },

  errorEnvioTitulo: {
    fontSize: 12,
    fontWeight: "700",

    color: COLORS.text,
  },

  errorEnvioTexto: {
    marginTop: 4,

    fontSize: 12,
    lineHeight: 17,

    color: COLORS.textSecondary,
  },

  sinDocumento: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    padding: 30,
  },

  sinDocumentoTitulo: {
    fontSize: 17,
    fontWeight: "700",

    textAlign: "center",

    color: COLORS.text,
  },
});

export default styles;
