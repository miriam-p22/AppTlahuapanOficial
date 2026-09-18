import { StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contenido: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },

  descripcion: {
    marginTop: 7,
    marginBottom: 28,

    fontSize: 14,
    lineHeight: 21,

    color: COLORS.textSecondary,
  },

  seccionTitulo: {
    marginBottom: 12,
    marginTop: 4,

    fontSize: 15,
    fontWeight: "700",

    color: COLORS.text,
  },
});

export default styles;
