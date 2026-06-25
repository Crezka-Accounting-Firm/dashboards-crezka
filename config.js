/**
 * CONFIGURACIÓN — Todo Marketing
 *
 * 1. Cuando tengas la URL de tu Apps Script (termina en /exec), pégala en
 *    sheetsEndpointBase. El dashboard agrega automáticamente "?hoja=..."
 *    según la pestaña que necesite.
 * 2. Mientras no esté conectado, el dashboard usa los datosEjemplo de abajo
 *    (puedes dejarlos o reemplazarlos por filas reales para hacer demos).
 * 3. Ajusta nombreCliente / colores si cambia el branding.
 */

window.DASHBOARD_CONFIG = {
  nombreCliente: "Todo Marketing",
  subtitulo: "Dashboard de Cobros y Pagos",
  moneda: "USD",
  localeNumeros: "es-SV",

  // <-- PEGA AQUÍ la URL de tu Apps Script (termina en /exec). Deja vacío
  // para trabajar solo con datos de ejemplo.
  sheetsEndpointBase: "https://script.google.com/macros/s/AKfycbxtH0Fq3zGXdoFWnPSBFDOPIdkKV44idPOeqNjDGnevu86TC0Ze095vnffbw7D9FAtIkQ/exec",

  colores: {
    primario: "#16213E",  // azul marino (Crezka)
    acento: "#14B8A6",    // teal
    fondo: "#EAF6F5"
  },

  // Días de anticipación para marcar pagos/cobros "por vencer" en amarillo
  diasAlertaVencimiento: 7,

  datosEjemplo: {

    pagosProveedores: [
      { "Quincena": "1ra", "Beneficiario / Concepto": "Canal 12 - Pauta TV", "Banco · Cuenta / NPE": "BAC · 123-456789-0", "Día vence": 15, "Monto": 3200, "MES": "Junio", "STATUS": "Pagado" },
      { "Quincena": "1ra", "Beneficiario / Concepto": "Radio YSKL - Cuñas", "Banco · Cuenta / NPE": "Banco Agrícola · 987-654321-0", "Día vence": 15, "Monto": 850, "MES": "Junio", "STATUS": "Pagado" },
      { "Quincena": "2da", "Beneficiario / Concepto": "Imprenta Centro - Material POP", "Banco · Cuenta / NPE": "NPE · 7032-1122", "Día vence": 28, "Monto": 1450, "MES": "Junio", "STATUS": "Pendiente" },
      { "Quincena": "2da", "Beneficiario / Concepto": "Productora Audiovisual ZetaFilms", "Banco · Cuenta / NPE": "Davivienda · 555-001-002", "Día vence": 30, "Monto": 4200, "MES": "Junio", "STATUS": "Pendiente" },
      { "Quincena": "2da", "Beneficiario / Concepto": "Meta Ads - Pauta digital", "Banco · Cuenta / NPE": "Tarjeta corporativa", "Día vence": 25, "Monto": 2750, "MES": "Junio", "STATUS": "Pendiente" },
      { "Quincena": "2da", "Beneficiario / Concepto": "Google Ads - Pauta digital", "Banco · Cuenta / NPE": "Tarjeta corporativa", "Día vence": 25, "Monto": 1980, "MES": "Junio", "STATUS": "Pendiente" },
      { "Quincena": "2da", "Beneficiario / Concepto": "Diseñador freelance - Branding", "Banco · Cuenta / NPE": "NPE · 7032-3344", "Día vence": 30, "Monto": 600, "MES": "Junio", "STATUS": "Vencido" },
      { "Quincena": "1ra", "Beneficiario / Concepto": "Vallas Publicitarias El Salvador", "Banco · Cuenta / NPE": "BAC · 123-456789-0", "Día vence": 10, "Monto": 2100, "MES": "Julio", "STATUS": "Pendiente" },
      { "Quincena": "1ra", "Beneficiario / Concepto": "Influencer - Campaña verano", "Banco · Cuenta / NPE": "NPE · 7032-5566", "Día vence": 12, "Monto": 900, "MES": "Julio", "STATUS": "Pendiente" }
    ],

    cobrosPautas: [
      { "CLIENTE": "Supermercados La Despensa", "N° DOCUMENTO": "FAC-1042", "F. EMISIÓN": "2026-05-10", "F. VENCIMIENTO": "2026-06-10", "SALDO PDTE (USD)": 0, "ESTATUS": "Pagado" },
      { "CLIENTE": "Banco del País", "N° DOCUMENTO": "FAC-1043", "F. EMISIÓN": "2026-05-12", "F. VENCIMIENTO": "2026-06-12", "SALDO PDTE (USD)": 4500, "ESTATUS": "Pendiente" },
      { "CLIENTE": "Farmacias Vida", "N° DOCUMENTO": "FAC-1044", "F. EMISIÓN": "2026-05-15", "F. VENCIMIENTO": "2026-06-15", "SALDO PDTE (USD)": 2300, "ESTATUS": "Pendiente" },
      { "CLIENTE": "AutoRepuestos Centro", "N° DOCUMENTO": "FAC-1031", "F. EMISIÓN": "2026-04-20", "F. VENCIMIENTO": "2026-05-20", "SALDO PDTE (USD)": 1800, "ESTATUS": "Vencido" },
      { "CLIENTE": "Distribuidora El Faro", "N° DOCUMENTO": "FAC-1045", "F. EMISIÓN": "2026-05-18", "F. VENCIMIENTO": "2026-06-18", "SALDO PDTE (USD)": 3100, "ESTATUS": "Pendiente" },
      { "CLIENTE": "Restaurante Mar y Tierra", "N° DOCUMENTO": "FAC-1046", "F. EMISIÓN": "2026-05-20", "F. VENCIMIENTO": "2026-06-20", "SALDO PDTE (USD)": 0, "ESTATUS": "Pagado" },
      { "CLIENTE": "Supermercados La Despensa", "N° DOCUMENTO": "FAC-1050", "F. EMISIÓN": "2026-06-01", "F. VENCIMIENTO": "2026-07-01", "SALDO PDTE (USD)": 4500, "ESTATUS": "Pendiente" },
      { "CLIENTE": "Banco del País", "N° DOCUMENTO": "FAC-1051", "F. EMISIÓN": "2026-06-02", "F. VENCIMIENTO": "2026-07-02", "SALDO PDTE (USD)": 6200, "ESTATUS": "Pendiente" }
    ],

    cobrosEspecializada: [
      { "CLIENTE": "Clínica Dental Sonrisas", "N° DOCUMENTO": "FE-301", "F. EMISIÓN": "2026-05-05", "F. VENCIMIENTO": "2026-06-05", "MONTO (USD)": 1200, "ESTATUS": "Pagado" },
      { "CLIENTE": "Inmobiliaria Vista Real", "N° DOCUMENTO": "FE-302", "F. EMISIÓN": "2026-05-10", "F. VENCIMIENTO": "2026-06-10", "MONTO (USD)": 3500, "ESTATUS": "Pendiente" },
      { "CLIENTE": "Universidad Privada del Norte", "N° DOCUMENTO": "FE-303", "F. EMISIÓN": "2026-04-15", "F. VENCIMIENTO": "2026-05-15", "MONTO (USD)": 5800, "ESTATUS": "Vencido" },
      { "CLIENTE": "Hotel Costa Bella", "N° DOCUMENTO": "FE-304", "F. EMISIÓN": "2026-05-22", "F. VENCIMIENTO": "2026-06-22", "MONTO (USD)": 2700, "ESTATUS": "Pendiente" },
      { "CLIENTE": "Clínica Dental Sonrisas", "N° DOCUMENTO": "FE-310", "F. EMISIÓN": "2026-06-05", "F. VENCIMIENTO": "2026-07-05", "MONTO (USD)": 1200, "ESTATUS": "Pendiente" },
      { "CLIENTE": "Cooperativa de Ahorro Unidos", "N° DOCUMENTO": "FE-311", "F. EMISIÓN": "2026-06-08", "F. VENCIMIENTO": "2026-07-08", "MONTO (USD)": 4100, "ESTATUS": "Pendiente" }
    ]
  }
};
