import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ScannerContext = createContext(null);

const ScannerProvider = ({ children }) => {
  const [paginas, setPaginas] = useState([]);

  const agregarPagina = useCallback((pagina) => {
    setPaginas((actuales) => [
      ...actuales,
      {
        id: `${Date.now()}-${Math.random()}`,
        uri: pagina.uri,
        width: pagina.width || null,
        height: pagina.height || null,
      },
    ]);
  }, []);

  const eliminarPagina = useCallback((id) => {
    setPaginas((actuales) => actuales.filter((pagina) => pagina.id !== id));
  }, []);

  const limpiarPaginas = useCallback(() => {
    setPaginas([]);
  }, []);

  const value = useMemo(
    () => ({
      paginas,
      agregarPagina,
      eliminarPagina,
      limpiarPaginas,
    }),
    [paginas, agregarPagina, eliminarPagina, limpiarPaginas],
  );

  return (
    <ScannerContext.Provider value={value}>{children}</ScannerContext.Provider>
  );
};

const useScannerContext = () => {
  const context = useContext(ScannerContext);

  if (!context) {
    throw new Error(
      "useScannerContext debe utilizarse dentro de ScannerProvider.",
    );
  }

  return context;
};

export { ScannerProvider, useScannerContext };
