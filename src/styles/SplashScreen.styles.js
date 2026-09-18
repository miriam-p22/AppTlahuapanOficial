import { StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
  },

  logo: {
    width: 190,
    height: 190,
    marginBottom: 24,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },

  subtitulo: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});

export default styles;
