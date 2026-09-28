import { KPIData } from './excelService';

export const mockKPIData: KPIData = {
  metaDelMes: 25,
  metaDelMesCLP: 713800000,
  metaReservas: 45,
  metaReservasCLP: 1383899997,
  reservasDelMes: 41, // 41 unidades
  reservasDelMesCLP: 1625700000, // $1.625.700.000
  firmasDelMes: 23, // 23 unidades
  firmasDelMesCLP: 959300000, // $959.300.000
  desistimientosDelMes: 4, // 4 unidades
  desistimientosDelMesCLP: 172600000, // $172.600.000
  diasFirmasDelMes: 25.4, // 25.4 días a firma
  metaDiasFirmas: 20, // Meta es 20 días
  porcentajeDesistimientos: 33.3, // 33.3% de desistimientos
  metaPorcentajeDesistimientos: 28, // Meta máxima 28%
  porcentajeContado: 59.0, // 59.0% contado
  porcentajeCredito: 31.0, // 31.0% crédito directo
  porcentajeHipotecario: 10.0, // 10.0% crédito hipotecario
  cobradoReal: 0, // Sin unidades específicas
  cobradoRealCLP: 55139146, // Pagado: $55.139.146 (49% cumplimiento)
  cobranzaEsperada: 0, // Sin unidades específicas
  cobranzaEsperadaCLP: 112534455, // Total a recaudar: $112.534.455 | Pendiente: $57.395.309
  conversionReservasAFirmas: 4.9, // 4.9% conversión (2 firmas de 41 reservas del mes)
  metaConversion: 65,
  formaPago: {
    contado: 14, // 59% contado (~14 unidades de 23)
    contadoCLP: 565987000, // 59% de 959.300.000
    credito: 7, // 31% crédito directo (~7 unidades de 23)
    creditoCLP: 297383000, // 31% de 959.300.000
    hipotecario: 2, // 10% crédito hipotecario (~2 unidades de 23)
    hipotecarioCLP: 95930000, // 10% de 959.300.000
  },
  hipotecariosPendientesCLP: 0,
  diasTramitacionHipotecario: 170, // 170 días de tramitación hipotecario
  metaDiasTramitacionHipotecario: 45,
  otros: {
    conversion: 3.1,
    promedioReserva: 48012500, // 1.536.400.000 / 32
    ticketPromedio: 44339130, // 1.019.800.000 / 23
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
