import * as Print from "expo-print";

import * as FileSystem from "expo-file-system/legacy";

const obtenerBase64 = async (uri) => {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
};

const obtenerMimeType = (uri) => {
  const ruta = String(uri || "").toLowerCase();

  if (ruta.includes(".png")) {
    return "image/png";
  }

  return "image/jpeg";
};

const construirPagina = async (pagina) => {
  const base64 = await obtenerBase64(pagina.uri);

  const mimeType = obtenerMimeType(pagina.uri);

  return `
    <section class="pagina">
      <img
        src="data:${mimeType};base64,${base64}"
        class="imagen"
      />
    </section>
  `;
};

const generarPdfDesdePaginas = async (paginas) => {
  if (!Array.isArray(paginas) || paginas.length === 0) {
    throw new Error("No existen páginas para generar el PDF.");
  }

  const paginasHtml = [];

  for (const pagina of paginas) {
    const paginaHtml = await construirPagina(pagina);

    paginasHtml.push(paginaHtml);
  }

  const html = `
    <!DOCTYPE html>

    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <style>
          @page {
            size: Letter portrait;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
          }

          .pagina {
            width: 612px;
            height: 792px;

            display: flex;
            align-items: center;
            justify-content: center;

            overflow: hidden;

            page-break-after: always;

            background: white;
          }

          .pagina:last-child {
            page-break-after: auto;
          }

          .imagen {
            width: 100%;
            height: 100%;

            object-fit: contain;
          }
        </style>
      </head>

      <body>
        ${paginasHtml.join("")}
      </body>
    </html>
  `;

  const resultado = await Print.printToFileAsync({
    html,
    width: 612,
    height: 792,
  });

  if (!resultado?.uri) {
    throw new Error("No fue posible generar el PDF.");
  }

  return {
    uri: resultado.uri,
    nombre: `documento-${Date.now()}.pdf`,
    type: "application/pdf",
    paginas: paginas.length,
  };
};

export { generarPdfDesdePaginas };
