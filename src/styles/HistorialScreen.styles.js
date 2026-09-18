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
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.text,
  },

  descripcion: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },

  resumen: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 18,
    marginBottom: 14,

    paddingVertical: 12,
    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,

    backgroundColor: COLORS.white,
  },

  resumenNumero: {
    marginRight: 8,

    fontSize: 20,
    fontWeight: "700",

    color: COLORS.primary,
  },

  resumenTexto: {
    flex: 1,

    fontSize: 13,
    color: COLORS.textSecondary,
  },

  estadoContainer: {
    alignItems: "center",

    marginTop: 8,

    paddingVertical: 36,
    paddingHorizontal: 24,

    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  estadoTexto: {
    marginTop: 12,

    fontSize: 14,
    lineHeight: 20,

    textAlign: "center",

    color: COLORS.textSecondary,
  },

  vacioTitulo: {
    fontSize: 17,
    fontWeight: "700",

    color: COLORS.text,
  },

  errorTitulo: {
    fontSize: 16,
    fontWeight: "700",

    textAlign: "center",

    color: COLORS.text,
  },

  errorTexto: {
    marginTop: 8,

    fontSize: 13,
    lineHeight: 19,

    textAlign: "center",

    color: COLORS.textSecondary,
  },

  botonReintentar: {
    marginTop: 18,

    paddingVertical: 11,
    paddingHorizontal: 20,

    borderRadius: 8,

    backgroundColor: COLORS.primary,
  },

  botonReintentarTexto: {
    fontSize: 13,
    fontWeight: "700",

    color: COLORS.white,
  },

  tarjeta: {
    marginBottom: 14,

    padding: 16,

    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  tarjetaCabecera: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  archivoInfo: {
    flex: 1,
    paddingRight: 10,
  },

  archivoNombre: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",

    color: COLORS.text,
  },

  archivoMeta: {
    marginTop: 5,

    fontSize: 12,

    color: COLORS.textSecondary,
  },

  estadoBadge: {
    maxWidth: 115,

    paddingVertical: 6,
    paddingHorizontal: 9,

    borderRadius: 8,

    backgroundColor: COLORS.background,
  },

  estadoBadgeTexto: {
    fontSize: 11,
    fontWeight: "700",

    textAlign: "center",

    color: COLORS.primary,
  },

  separador: {
    height: 1,

    marginVertical: 13,

    backgroundColor: COLORS.border,
  },

  filaDato: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    marginBottom: 9,
  },

  datoEtiqueta: {
    fontSize: 12,
    fontWeight: "600",

    color: COLORS.textSecondary,
  },

  datoValor: {
    flex: 1,

    marginLeft: 16,

    fontSize: 12,
    fontWeight: "600",

    textAlign: "right",

    color: COLORS.text,
  },

  destinosContainer: {
    marginTop: 4,
  },

  areaFila: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 8,
  },

  areaPunto: {
    width: 6,
    height: 6,

    marginRight: 8,

    borderRadius: 3,

    backgroundColor: COLORS.primary,
  },

  areaTexto: {
    flex: 1,

    fontSize: 12,
    lineHeight: 17,

    color: COLORS.text,
  },

  sinDestinos: {
    marginTop: 7,

    fontSize: 12,

    color: COLORS.textSecondary,
  },

  estadoEnvioExitoso: {
    flex: 1,

    marginLeft: 16,

    fontSize: 12,
    fontWeight: "700",

    textAlign: "right",

    color: "#2e7d32",
  },

  estadoEnvioPendiente: {
    flex: 1,

    marginLeft: 16,

    fontSize: 12,
    fontWeight: "700",

    textAlign: "right",

    color: "#a66a00",
  },

  verDetalle: {
    marginTop: 14,

    fontSize: 13,
    fontWeight: "700",

    textAlign: "right",

    color: COLORS.primary,
  },
});

export default styles;
