const API_URL = String(process.env.EXPO_PUBLIC_API_URL || "").trim();

const APP_MOVIL_TOKEN = String(
  process.env.EXPO_PUBLIC_APP_MOVIL_TOKEN || "",
).trim();

const construirUrl = (ruta) => {
  const base = API_URL.replace(/\/+$/, "");
  const endpoint = String(ruta || "").replace(/^\/+/, "");

  return `${base}/${endpoint}`;
};

const validarConfiguracion = () => {
  if (!API_URL) {
    throw new Error("No se ha configurado EXPO_PUBLIC_API_URL.");
  }

  if (!APP_MOVIL_TOKEN) {
    throw new Error("No se ha configurado EXPO_PUBLIC_APP_MOVIL_TOKEN.");
  }
};

const apiFetch = async (ruta, opciones = {}) => {
  validarConfiguracion();

  const headers = {
    Accept: "application/json",
    "x-app-token": APP_MOVIL_TOKEN,
    ...(opciones.headers || {}),
  };

  const respuesta = await fetch(construirUrl(ruta), {
    ...opciones,
    headers,
  });

  let datos = null;

  try {
    datos = await respuesta.json();
  } catch {
    datos = null;
  }

  if (!respuesta.ok) {
    const mensaje =
      datos?.error || datos?.message || `Error HTTP ${respuesta.status}.`;

    throw new Error(mensaje);
  }

  return datos;
};

export { API_URL, apiFetch };
