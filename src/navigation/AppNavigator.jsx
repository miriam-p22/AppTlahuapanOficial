import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";

import InicioScreen from "../screens/InicioScreen";

import ScannerScreen from "../screens/ScannerScreen";

import PreviewScreen from "../screens/PreviewScreen";

import SeleccionarArchivoScreen from "../screens/SeleccionarArchivoScreen";

import HistorialScreen from "../screens/HistorialScreen";

import DetalleHistorialScreen from "../screens/DetalleHistorialScreen";

import FormularioScreen from "../screens/FormularioScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Inicio" component={InicioScreen} />

        <Stack.Screen name="Scanner" component={ScannerScreen} />

        <Stack.Screen name="Preview" component={PreviewScreen} />

        <Stack.Screen name="Formulario" component={FormularioScreen} />

        <Stack.Screen
          name="SeleccionarArchivo"
          component={SeleccionarArchivoScreen}
        />

        <Stack.Screen name="Historial" component={HistorialScreen} />

        <Stack.Screen
          name="DetalleHistorial"
          component={DetalleHistorialScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
