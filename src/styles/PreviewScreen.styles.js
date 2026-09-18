import { Platform, StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  superior: {
    minHeight: 100,

    paddingTop: 48,
    paddingHorizontal: 18,
    paddingBottom: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: COLORS.white,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  regresar: {
    width: 75,
  },

  regresarTexto: {
    fontSize: 14,
    fontWeight: "600",

    color: COLORS.danger,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "700",

    color: COLORS.text,

    textAlign: "center",
  },

  contador: {
    marginTop: 2,

    fontSize: 12,

    color: COLORS.textSecondary,

    textAlign: "center",
  },

  espacio: {
    width: 75,
  },

  lista: {
    padding: 18,
    paddingBottom: 24,
  },

  pagina: {
    marginBottom: 16,
    padding: 12,

    borderRadius: 12,

    borderWidth: 1,
    borderColor: COLORS.border,

    backgroundColor: COLORS.white,
  },

  paginaCabecera: {
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  paginaTitulo: {
    fontSize: 14,
    fontWeight: "700",

    color: COLORS.text,
  },

  eliminar: {
    fontSize: 13,
    fontWeight: "600",

    color: COLORS.danger,
  },

  imagen: {
    width: "100%",
    height: 430,

    borderRadius: 6,

    backgroundColor: "#eeeeee",
  },

  vacio: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 30,
  },

  vacioTitulo: {
    fontSize: 19,
    fontWeight: "700",

    color: COLORS.text,
  },

  vacioDescripcion: {
    marginTop: 7,

    fontSize: 14,

    color: COLORS.textSecondary,

    textAlign: "center",
  },

  acciones: {
    padding: 14,
    paddingHorizontal: 16,

    paddingBottom: Platform.OS === "android" ? 52 : 20,

    borderTopWidth: 1,
    borderTopColor: COLORS.border,

    backgroundColor: COLORS.white,
  },

  botonSecundario: {
    minHeight: 46,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,

    borderRadius: 8,

    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  botonSecundarioTexto: {
    fontSize: 14,
    fontWeight: "700",

    color: COLORS.primary,
  },

  botonPrincipal: {
    minHeight: 48,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 8,

    backgroundColor: COLORS.primary,
  },

  botonPrincipalTexto: {
    fontSize: 14,
    fontWeight: "700",

    color: COLORS.white,
  },

  botonDeshabilitado: {
    opacity: 0.45,
  },

  generandoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  generandoTexto: {
    marginLeft: 9,

    fontSize: 14,
    fontWeight: "700",

    color: COLORS.white,
  },
});

export default styles;
