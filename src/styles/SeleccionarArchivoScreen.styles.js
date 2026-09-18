import { StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.background,
  },

  contenido: {
    flex: 1,

    padding: 20,
  },

  regresar: {
    alignSelf: "flex-start",

    marginBottom: 20,

    paddingVertical: 6,
    paddingRight: 14,
  },

  regresarTexto: {
    fontSize: 15,
    fontWeight: "600",

    color: COLORS.primary,
  },

  tarjeta: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 28,

    paddingVertical: 30,

    borderRadius: 14,

    borderWidth: 1,
    borderColor: COLORS.border,

    backgroundColor: COLORS.white,
  },

  tarjetaDeshabilitada: {
    opacity: 0.65,
  },

  icono: {
    marginBottom: 18,

    fontSize: 54,
    fontWeight: "300",

    color: COLORS.primary,
  },

  titulo: {
    marginTop: 12,

    fontSize: 20,
    fontWeight: "700",

    color: COLORS.text,

    textAlign: "center",
  },

  descripcion: {
    marginTop: 10,

    maxWidth: 310,

    fontSize: 14,
    lineHeight: 21,

    color: COLORS.textSecondary,

    textAlign: "center",
  },

  formatos: {
    marginTop: 18,

    paddingVertical: 7,
    paddingHorizontal: 12,

    borderRadius: 8,

    backgroundColor: COLORS.background,
  },

  formatosTexto: {
    fontSize: 12,
    fontWeight: "600",

    color: COLORS.textSecondary,
  },

  botonSeleccionar: {
    minWidth: 170,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 24,

    paddingVertical: 13,
    paddingHorizontal: 20,

    borderRadius: 9,

    backgroundColor: COLORS.primary,
  },

  botonSeleccionarTexto: {
    fontSize: 14,
    fontWeight: "700",

    color: COLORS.white,
  },
});

export default styles;
