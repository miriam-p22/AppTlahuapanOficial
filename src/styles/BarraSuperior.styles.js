import { Platform, StatusBar, StyleSheet } from "react-native";

import COLORS from "./colors";

const styles = StyleSheet.create({
  container: {
    minHeight: 90,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 18,

    paddingBottom: 12,
    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.white,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  logo: {
    width: 58,
    height: 58,
  },

  textos: {
    flex: 1,
    marginLeft: 12,
  },

  nombre: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  titulo: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});

export default styles;
