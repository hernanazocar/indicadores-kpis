import { KPIData } from './excelService';

export const mockKPIData: KPIData = {
  metaDelMes: 25,
  metaDelMesCLP: 713800000,
  metaReservas: 45,
  metaReservasCLP: 1383899997,
  reservasDelMes: 17, // 17 unidades
  reservasDelMesCLP: 685500000, // $685.500.000
  firmasDelMes: 14, // 14 unidades
  firmasDelMesCLP: 621700000, // $621.700.000
  desistimientosDelMes: 1, // 1 unidad
  desistimientosDelMesCLP: 59900000, // $59.900.000
  diasFirmasDelMes: 25.6, // 25.6 días a firma
  metaDiasFirmas: 20, // Meta es 20 días
  porcentajeDesistimientos: 34.5, // 34.5% de desistimientos
  metaPorcentajeDesistimientos: 28, // Meta máxima 28%
  porcentajeContado: 59.7, // 59.7% contado
  porcentajeCredito: 40.7, // 40.7% crédito directo
  cobradoReal: 0, // Sin unidades específicas
  cobradoRealCLP: 58073439, // Pagado: $58.073.439 (55.6% cumplimiento)
  cobranzaEsperada: 0, // Sin unidades específicas
  cobranzaEsperadaCLP: 104433209, // Total a recaudar: $104.433.209 | Pendiente: $46.359.770
  conversionReservasAFirmas: 0, // 0 firmas de las 5 reservas de este mes = 0%
  metaConversion: 65,
  formaPago: {
    contado: 2, // 58.4% contado (~2 unidades de 4)
    contadoCLP: 86782400, // 58.4% de 148.600.000
    credito: 2, // 41.6% crédito directo (~2 unidades de 4)
    creditoCLP: 61817600, // 41.6% de 148.600.000
    hipotecario: 0, // 0% crédito hipotecario
    hipotecarioCLP: 0,
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
