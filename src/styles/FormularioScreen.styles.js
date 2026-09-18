import { Platform, StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.background,
  },

  contenido: {
    padding: 20,

    paddingBottom: Platform.OS === "android" ? 70 : 40,
  },

  regresar: {
    alignSelf: "flex-start",

    marginBottom: 18,

    paddingVertical: 5,
    paddingRight: 14,
  },

  regresarTexto: {
    fontSize: 15,
    fontWeight: "600",

    color: COLORS.primary,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "700",

    color: COLORS.text,
  },

  descripcion: {
    marginTop: 6,
    marginBottom: 20,

    fontSize: 14,
    lineHeight: 20,

    color: COLORS.textSecondary,
  },

  tarjeta: {
    padding: 16,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  etiqueta: {
    marginBottom: 5,

    fontSize: 12,
    fontWeight: "600",

    color: COLORS.textSecondary,
  },

  archivoNombre: {
    fontSize: 15,
    fontWeight: "700",

    color: COLORS.text,
  },

  archivoDetalle: {
    marginTop: 5,

    fontSize: 13,

    color: COLORS.textSecondary,
  },

  seccion: {
    marginTop: 24,
    marginBottom: 10,

    fontSize: 16,
    fontWeight: "700",

    color: COLORS.text,
  },

  selectorFecha: {
    minHeight: 52,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 10,

    backgroundColor: COLORS.white,
  },

  selectorFechaTexto: {
    fontSize: 14,

    color: COLORS.text,
  },

  selectorFechaPlaceholder: {
    color: COLORS.textSecondary,
  },

  fechaIcono: {
    fontSize: 16,

    color: COLORS.textSecondary,
  },

  seccionCabecera: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  totalSeleccionadas: {
    marginBottom: 10,

    fontSize: 12,
    fontWeight: "600",

    color: COLORS.primary,
  },

  listaAreas: {
    overflow: "hidden",

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  area: {
    minHeight: 54,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,
    paddingVertical: 10,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  areaSeleccionada: {
    backgroundColor: "#eef5f8",
  },

  checkbox: {
    width: 22,
    height: 22,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,

    borderWidth: 1.5,
    borderColor: COLORS.border,

    borderRadius: 5,

    backgroundColor: COLORS.white,
  },

  checkboxSeleccionado: {
    borderColor: COLORS.primary,

    backgroundColor: COLORS.primary,
  },

  checkboxMarca: {
    fontSize: 14,
    fontWeight: "800",

    color: COLORS.white,
  },

  areaNombre: {
    flex: 1,

    fontSize: 14,

    color: COLORS.text,
  },

  areaNombreSeleccionada: {
    fontWeight: "600",

    color: COLORS.text,
  },

  cargandoContainer: {
    minHeight: 90,

    alignItems: "center",
    justifyContent: "center",

    padding: 16,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 12,

    backgroundColor: COLORS.white,
  },

  informacion: {
    marginTop: 8,

    fontSize: 14,

    color: COLORS.textSecondary,
  },

  errorContainer: {
    padding: 16,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 10,

    backgroundColor: COLORS.white,
  },

  error: {
    fontSize: 14,
    lineHeight: 20,

    color: COLORS.danger,
  },

  reintentar: {
    alignSelf: "flex-start",

    marginTop: 12,

    paddingVertical: 9,
    paddingHorizontal: 14,

    borderRadius: 7,

    backgroundColor: COLORS.primary,
  },

  reintentarTexto: {
    fontSize: 13,
    fontWeight: "700",

    color: COLORS.white,
  },

  botonEnviar: {
    minHeight: 52,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 28,

    borderRadius: 9,

    backgroundColor: COLORS.primary,
  },

  botonEnviarTexto: {
    fontSize: 15,
    fontWeight: "700",

    color: COLORS.white,
  },

  botonDeshabilitado: {
    opacity: 0.55,
  },

  enviandoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 9,
  },
});

export default styles;
