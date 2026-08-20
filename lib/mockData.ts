import { KPIData } from './excelService';

export const mockKPIData: KPIData = {
  metaDelMes: 30,
  metaDelMesCLP: 922599998,
  metaReservas: 45,
  metaReservasCLP: 1383899997,
  reservasDelMes: 26, // 26 unidades
  reservasDelMesCLP: 1247000000, // $1.247.000.000
  firmasDelMes: 13, // 13 unidades
  firmasDelMesCLP: 617400000, // $617.400.000
  desistimientosDelMes: 10, // 10 unidades
  desistimientosDelMesCLP: 527000000, // $527.000.000
  diasFirmasDelMes: 25.6, // 25,6 días a firma (de 26 reservas)
  metaDiasFirmas: 22, // Meta es 22 días
  porcentajeDesistimientos: 37, // 37% de desistimientos
  metaPorcentajeDesistimientos: 32, // Meta máxima 32%
  porcentajeContado: 61.5, // 61,5% contado
  porcentajeCredito: 38.5, // 38,5% crédito directo
  cobradoReal: 0, // Sin unidades específicas
  cobradoRealCLP: 20368430, // Realmente recaudado
  cobranzaEsperada: 0, // Sin unidades específicas
  cobranzaEsperadaCLP: 92296645, // Deberíamos recaudar este mes
  conversionReservasAFirmas: 3.8, // 1 firma de 26 reservas del mes = 3,8%
  metaConversion: 65,
  formaPago: {
    contado: 8, // 61,5% contado (8 unidades de 13)
    contadoCLP: 379701000,
    credito: 5, // 38,5% crédito directo (5 unidades de 13)
    creditoCLP: 237699000,
    hipotecario: 0, // 0% crédito hipotecario
    hipotecarioCLP: 0,
  },
  hipotecariosPendientesCLP: 0,
  diasTramitacionHipotecario: 186, // 186 días de tramitación
  metaDiasTramitacionHipotecario: 45,
  otros: {
    conversion: 3.8,
    promedioReserva: 47961538, // 1.247.000.000 / 26
    ticketPromedio: 47492308, // 617.400.000 / 13
  },
  ultimaActualizacion: new Date().toISOString(),
};

// Función para generar datos aleatorios para testing
export function generateRandomKPIData(): KPIData {
  const meta = Math.floor(Math.random() * 30) + 40; // Meta entre 40-70
  const reservas = Math.floor(Math.random() * 50) + 20;
  const firmas = Math.floor(Math.random() * reservas);
  const desistimientos = Math.floor(Math.random() * 10);
  const contado = Math.floor(Math.random() * 20);
  const credito = Math.floor(Math.random() * 20);
  const hipotecario = Math.floor(Math.random() * 15);
  const pendientes = Math.floor(Math.random() * 12);

  // Valores promedio por unidad
  const valorPromedioReserva = Math.floor(Math.random() * 50000000) + 100000000; // 100M-150M
  const valorPromedioFirma = Math.floor(Math.random() * 50000000) + 100000000;
  const valorPromedioDesistimiento = Math.floor(Math.random() * 50000000) + 100000000;
  const valorPromedioContado = Math.floor(Math.random() * 50000000) + 100000000;
  const valorPromedioCredito = Math.floor(Math.random() * 50000000) + 100000000;
  const valorPromedioHipotecario = Math.floor(Math.random() * 50000000) + 100000000;
  const valorPromedioPendiente = Math.floor(Math.random() * 50000000) + 100000000;

  const diasFirmas = Math.floor(Math.random() * 15) + 3;
  const cobranzaEsperada = Math.floor(Math.random() * 30) + 15;
  const cobradoReal = Math.floor(Math.random() * cobranzaEsperada); // Cobrado real <= esperado

  return {
    metaDelMes: meta,
    metaDelMesCLP: meta * valorPromedioReserva,
    metaReservas: meta,
    metaReservasCLP: meta * valorPromedioReserva,
    reservasDelMes: reservas,
    reservasDelMesCLP: reservas * valorPromedioReserva,
    firmasDelMes: firmas,
    firmasDelMesCLP: firmas * valorPromedioFirma,
    desistimientosDelMes: desistimientos,
    desistimientosDelMesCLP: desistimientos * valorPromedioDesistimiento,
    diasFirmasDelMes: diasFirmas,
    metaDiasFirmas: 30,
    porcentajeDesistimientos: reservas > 0 ? Math.round((desistimientos / reservas) * 100) : 0,
    metaPorcentajeDesistimientos: 10,
    porcentajeContado: firmas > 0 ? Math.round((contado / firmas) * 100) : 0,
    porcentajeCredito: firmas > 0 ? Math.round((credito / firmas) * 100) : 0,
    cobradoReal: cobradoReal,
    cobradoRealCLP: cobradoReal * valorPromedioFirma,
    cobranzaEsperada: cobranzaEsperada,
    cobranzaEsperadaCLP: cobranzaEsperada * valorPromedioFirma,
    conversionReservasAFirmas: reservas > 0 ? Math.round((firmas / reservas) * 100) : 0,
    metaConversion: 65,
    formaPago: {
      contado,
      contadoCLP: contado * valorPromedioContado,
      credito,
      creditoCLP: credito * valorPromedioCredito,
      hipotecario,
      hipotecarioCLP: hipotecario * valorPromedioHipotecario,
    },
    hipotecariosPendientesCLP: pendientes * valorPromedioPendiente,
    diasTramitacionHipotecario: Math.floor(Math.random() * 30) + 20, // 20-50 días
    metaDiasTramitacionHipotecario: 45,
    otros: {
      conversion: Math.round((firmas / reservas) * 100 * 10) / 10,
      promedioReserva: valorPromedioReserva,
      ticketPromedio: Math.floor(Math.random() * 40000000) + 70000000,
    },
    ultimaActualizacion: new Date().toISOString(),
  };
}
