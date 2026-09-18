import React from "react";

import { ScannerProvider } from "./src/context/ScannerContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <ScannerProvider>
      <AppNavigator />
    </ScannerProvider>
  );
}