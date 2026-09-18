import { apiFetch } from "./api";

const obtenerAreas = async () => {
  return await apiFetch("/api/areas/app/listado");
};

export { obtenerAreas };
