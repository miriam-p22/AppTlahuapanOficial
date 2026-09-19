import { Platform, StatusBar, StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: COLORS.black,
  },

  cameraContainer: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: "space-between",
  },

  superior: {
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 14 : 50,

    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  botonSuperior: {
    paddingVertical: 9,
    paddingHorizontal: 13,

    borderRadius: 8,

    backgroundColor: "rgba(0,0,0,0.55)",
  },

  botonSuperiorTexto: {
    fontSize: 15,
    fontWeight: "600",

    color: COLORS.white,
  },

  contador: {
    paddingVertical: 9,
    paddingHorizontal: 13,

    borderRadius: 8,

    backgroundColor: "rgba(0,0,0,0.55)",
  },

  contadorTexto: {
    fontSize: 13,
    fontWeight: "600",

    color: COLORS.white,
  },

  centro: {
    flex: 1,
  },

  inferior: {
    alignItems: "center",

    paddingHorizontal: 20,
    paddingTop: 14,

    paddingBottom: Platform.OS === "android" ? 52 : 34,

    backgroundColor: "rgba(0,0,0,0.42)",
  },

  ayuda: {
    marginBottom: 14,

    fontSize: 12,

    color: COLORS.white,

    textAlign: "center",
  },

  botonCaptura: {
    width: 74,
    height: 74,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 37,

    borderWidth: 4,
    borderColor: COLORS.white,

    backgroundColor: "rgba(255,255,255,0.18)",
  },

  botonCapturaInterior: {
    width: 56,
    height: 56,

    borderRadius: 28,

    backgroundColor: COLORS.white,
  },

  botonCapturaDeshabilitado: {
    opacity: 0.5,
  },

  escanearTexto: {
    marginTop: 7,

    fontSize: 13,
    fontWeight: "600",

    color: COLORS.white,
  },

  estadoContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 30,

    backgroundColor: COLORS.background,
  },

  estadoTexto: {
    marginTop: 14,

    fontSize: 14,

    color: COLORS.textSecondary,
  },

  permisoTitulo: {
    fontSize: 22,
    fontWeight: "700",

    color: COLORS.text,

    textAlign: "center",
  },

  permisoDescripcion: {
    marginTop: 10,
    marginBottom: 24,

    fontSize: 14,
    lineHeight: 21,

    color: COLORS.textSecondary,

    textAlign: "center",
  },

  botonPermiso: {
    width: "100%",

    alignItems: "center",

    paddingVertical: 14,

    borderRadius: 8,

    backgroundColor: COLORS.primary,
  },

  botonPermisoTexto: {
    fontSize: 14,
    fontWeight: "700",

    color: COLORS.white,
  },

  botonCancelar: {
    marginTop: 12,

    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  botonCancelarTexto: {
    fontSize: 14,
    fontWeight: "600",

    color: COLORS.textSecondary,
  },
});

export default styles;
