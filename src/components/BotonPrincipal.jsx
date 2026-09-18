import React from "react";

import { Pressable, Text, View } from "react-native";

import styles from "../styles/BotonPrincipal.styles";

const BotonPrincipal = ({
  titulo,
  descripcion,
  icono,
  onPress,
  secundario = false,
  disabled = false,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.boton,
        secundario && styles.botonSecundario,
        pressed && !disabled && styles.presionado,
        disabled && styles.deshabilitado,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icono ? (
        <View
          style={[
            styles.iconoContainer,
            secundario && styles.iconoContainerSecundario,
          ]}
        >
          <Text style={[styles.icono, secundario && styles.iconoSecundario]}>
            {icono}
          </Text>
        </View>
      ) : null}

      <View style={styles.contenido}>
        <Text style={[styles.titulo, secundario && styles.tituloSecundario]}>
          {titulo}
        </Text>

        {descripcion ? (
          <Text
            style={[
              styles.descripcion,
              secundario && styles.descripcionSecundaria,
            ]}
          >
            {descripcion}
          </Text>
        ) : null}
      </View>

      <Text style={[styles.flecha, secundario && styles.flechaSecundaria]}>
        ›
      </Text>
    </Pressable>
  );
};

export default BotonPrincipal;
