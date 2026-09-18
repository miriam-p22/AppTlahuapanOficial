import { useCallback, useEffect, useState } from "react";

import { obtenerAreas } from "../api/areas.api";

const useAreas = () => {
  const [areas, setAreas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarAreas = useCallback(async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await obtenerAreas();

      const lista = Array.isArray(respuesta)
        ? respuesta
        : respuesta?.areas || [];

      setAreas(lista);
    } catch (errorPeticion) {
      console.error("Error al consultar áreas:", errorPeticion);

      setAreas([]);

      setError(errorPeticion?.message || "No fue posible consultar las áreas.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarAreas();
  }, [cargarAreas]);

  return {
    areas,
    cargando,
    error,
    cargarAreas,
  };
};

export default useAreas;
