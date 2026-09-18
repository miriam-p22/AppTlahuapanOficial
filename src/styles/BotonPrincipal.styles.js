import { StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  boton: {
    minHeight: 92,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,

    borderRadius: 12,

    backgroundColor: COLORS.primary,
  },

  botonSecundario: {
    backgroundColor: COLORS.white,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  iconoContainer: {
    width: 50,
    height: 50,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 14,

    borderRadius: 10,

    backgroundColor: "rgba(255,255,255,0.18)",
  },

  iconoContainerSecundario: {
    backgroundColor: COLORS.background,
  },

  icono: {
    fontSize: 25,
    color: COLORS.white,
  },

  iconoSecundario: {
    color: COLORS.primary,
  },

  contenido: {
    flex: 1,
  },

  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },

  tituloSecundario: {
    color: COLORS.text,
  },

  descripcion: {
    marginTop: 4,

    fontSize: 13,
    lineHeight: 18,

    color: "rgba(255,255,255,0.85)",
  },

  descripcionSecundaria: {
    color: COLORS.textSecondary,
  },

  flecha: {
    marginLeft: 10,

    fontSize: 30,
    fontWeight: "300",

    color: COLORS.white,
  },

  flechaSecundaria: {
    color: COLORS.textSecondary,
  },

  presionado: {
    opacity: 0.8,
  },

  deshabilitado: {
    opacity: 0.5,
  },
});

export default styles;
