import { File } from "expo-file-system";

import { fetch } from "expo/fetch";

const API_URL = String(process.env.EXPO_PUBLIC_API_URL || "").trim();

const APP_MOVIL_TOKEN = String(
  process.env.EXPO_PUBLIC_APP_MOVIL_TOKEN || "",
).trim();

const validarConfiguracion = () => {
  if (!API_URL) {
    throw new Error("No está configurada EXPO_PUBLIC_API_URL.");
  }

  if (!APP_MOVIL_TOKEN) {
    throw new Error("No está configurado EXPO_PUBLIC_APP_MOVIL_TOKEN.");
  }
};

const leerRespuesta = async (respuesta) => {
  const texto = await respuesta.text();

  let datos = null;

  if (texto) {
    try {
      datos = JSON.parse(texto);
    } catch {
      datos = null;
    }
  }

  console.log("HTTP:", respuesta.status);

  console.log("Respuesta del servidor:", texto);

  if (!respuesta.ok) {
    throw new Error(
      datos?.error ||
        datos?.message ||
        texto ||
        `Error HTTP ${respuesta.status}`,
    );
  }

  return datos;
};

const subirEscaneoApp = async ({ paginas, fechaLimite, destinos }) => {
  validarConfiguracion();

  if (!Array.isArray(paginas) || paginas.length === 0) {
    throw new Error("No existen páginas escaneadas.");
  }

  if (!fechaLimite) {
    throw new Error("Selecciona una fecha límite.");
  }

  if (!Array.isArray(destinos) || destinos.length === 0) {
    throw new Error("Selecciona al menos un área destino.");
  }

  const formData = new FormData();

  for (let index = 0; index < paginas.length; index += 1) {
    const pagina = paginas[index];

    if (!pagina?.uri) {
      throw new Error(`La página ${index + 1} no está disponible.`);
    }

    console.log(`Página ${index + 1}:`, pagina.uri);

    const archivo = new File(pagina.uri);

    formData.append("paginas", archivo);
  }

  formData.append("fecha_limite", String(fechaLimite));

  formData.append("destinos", JSON.stringify(destinos));

  const url = `${API_URL}/api/dispersion/escanear-app`;

  console.log("Enviando escaneo a:", url);

  console.log("Número de páginas:", paginas.length);

  console.log("Fecha límite:", fechaLimite);

  console.log("Destinos:", destinos);

  try {
    const respuesta = await fetch(url, {
      method: "POST",

      headers: {
        Accept: "application/json",

        "x-app-token": APP_MOVIL_TOKEN,
      },

      body: formData,
    });

    return await leerRespuesta(respuesta);
  } catch (error) {
    console.error("Error en subirEscaneoApp:", error);

    throw error;
  }
};

const subirArchivoApp = async ({ archivo, fechaLimite, destinos }) => {
  validarConfiguracion();

  if (!archivo?.uri) {
    throw new Error("No existe un archivo seleccionado.");
  }

  if (!fechaLimite) {
    throw new Error("Selecciona una fecha límite.");
  }

  if (!Array.isArray(destinos) || destinos.length === 0) {
    throw new Error("Selecciona al menos un área destino.");
  }

  try {
    const archivoFormulario = new File(archivo.uri);

    console.log("Preparando archivo:", archivoFormulario.uri);

    console.log("Existe:", archivoFormulario.exists);

    console.log("Nombre:", archivoFormulario.name);

    console.log("Tipo:", archivoFormulario.type);

    console.log("Tamaño:", archivoFormulario.size);

    if (!archivoFormulario.exists) {
      throw new Error(
        "El archivo seleccionado no está disponible para lectura.",
      );
    }

    const formData = new FormData();

    formData.append("archivo", archivoFormulario);

    formData.append("fecha_limite", String(fechaLimite));

    formData.append("destinos", JSON.stringify(destinos));

    const url = `${API_URL}/api/dispersion/subir-app`;

    console.log("Enviando archivo a:", url);

    console.log("Fecha límite:", fechaLimite);

    console.log("Destinos:", destinos);

    const respuesta = await fetch(url, {
      method: "POST",

      headers: {
        Accept: "application/json",

        "x-app-token": APP_MOVIL_TOKEN,
      },

      body: formData,
    });

    return await leerRespuesta(respuesta);
  } catch (error) {
    console.error("Error en subirArchivoApp:", error);

    throw error;
  }
};
const obtenerHistorialApp = async () => {
  validarConfiguracion();

  const url = `${API_URL}/api/dispersion/historial-app`;

  console.log("Consultando historial:", url);

  try {
    const respuesta = await fetch(url, {
      method: "GET",

      headers: {
        Accept: "application/json",

        "x-app-token": APP_MOVIL_TOKEN,
      },
    });

    const datos = await leerRespuesta(respuesta);

    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error("Error en obtenerHistorialApp:", error);

    throw error;
  }
};

export { obtenerHistorialApp, subirArchivoApp, subirEscaneoApp };
