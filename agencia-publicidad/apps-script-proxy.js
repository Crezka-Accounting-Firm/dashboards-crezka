/**
 * APPS SCRIPT PROXY MULTI-HOJA — convierte varias pestañas de UN MISMO
 * libro de Google Sheets en una API JSON accesible vía fetch().
 *
 * INSTRUCCIONES:
 * 1. Abre tu libro de Google Sheets (el que tiene las 3 pestañas:
 *    Pagos a Proveedores, Cobros Pautas, Cobros Publicidad Especializada).
 * 2. Menú: Extensiones → Apps Script.
 * 3. Borra el contenido de Code.gs y pega TODO este archivo.
 * 4. Ajusta el mapa HOJAS_PERMITIDAS abajo: a la derecha de cada "clave"
 *    pon el nombre EXACTO de la pestaña tal como aparece en tu libro
 *    (mayúsculas, acentos, espacios — debe coincidir exactamente).
 * 5. Menú: Implementar → Nueva implementación.
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 6. Copia la URL que termina en /exec — esa es tu SHEETS_ENDPOINT_BASE
 *    para config.js. El dashboard le agregará automáticamente
 *    "?hoja=pagosProveedores" / "?hoja=cobrosPautas" / "?hoja=cobrosEspecializada".
 * 7. Cada vez que cambies este código, vuelve a "Nueva implementación"
 *    (o "Gestionar implementaciones" → editar → nueva versión).
 *
 * PRUEBA RÁPIDA: abre en el navegador
 *   TU_URL/exec?hoja=pagosProveedores
 * y deberías ver un JSON con tus filas de esa pestaña.
 */

// <-- AJUSTA AQUÍ: clave interna -> nombre exacto de la pestaña en tu Sheet
const HOJAS_PERMITIDAS = {
  pagosProveedores: 'Pagos a Proveedores',
  cobrosPautas: 'Cobros Pautas',
  cobrosEspecializada: 'Cobros Publicidad Especializada'
};

function doGet(e) {
  const claveHoja = e && e.parameter ? e.parameter.hoja : null;

  if (!claveHoja) {
    // Sin parámetro: devuelve TODO en un solo objeto (útil para pruebas)
    const resultado = {};
    Object.keys(HOJAS_PERMITIDAS).forEach(clave => {
      resultado[clave] = leerHoja(HOJAS_PERMITIDAS[clave]);
    });
    return respuestaJSON(resultado, 200);
  }

  if (!HOJAS_PERMITIDAS[claveHoja]) {
    return respuestaJSON({
      error: `Clave de hoja "${claveHoja}" no reconocida`,
      hojasDisponibles: Object.keys(HOJAS_PERMITIDAS)
    }, 400);
  }

  const datos = leerHoja(HOJAS_PERMITIDAS[claveHoja]);
  if (datos === null) {
    return respuestaJSON({ error: `No se encontró la pestaña "${HOJAS_PERMITIDAS[claveHoja]}"` }, 404);
  }
  return respuestaJSON(datos, 200);
}

function leerHoja(nombrePestana) {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombrePestana);
  if (!hoja) return null;

  const filas = hoja.getDataRange().getValues();
  const encabezados = filas[0];
  const datos = [];

  for (let i = 1; i < filas.length; i++) {
    const fila = filas[i];
    if (fila.every(celda => celda === '' || celda === null)) continue;

    const registro = {};
    encabezados.forEach((encabezado, col) => {
      let valor = fila[col];
      if (valor instanceof Date) {
        valor = valor.toISOString();
      }
      registro[String(encabezado).trim()] = valor;
    });
    datos.push(registro);
  }

  return datos;
}

function respuestaJSON(objeto, codigo) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
