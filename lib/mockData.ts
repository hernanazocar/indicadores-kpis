import { KPIData } from './excelService';

export const mockKPIData: KPIData = {
  metaDelMes: 30,
  metaDelMesCLP: 922599998,
  reservasDelMes: 14,
  reservasDelMesCLP: 707600000,
  firmasDelMes: 1,
  firmasDelMesCLP: 41000000,
  desistimientosDelMes: 2,
  desistimientosDelMesCLP: 104800000,
  diasFirmasDelMes: 7,
  metaDiasFirmas: 30,
  porcentajeDesistimientos: 14, // 2/14 * 100
  metaPorcentajeDesistimientos: 10,
  porcentajeContado: 100, // 1/1 * 100 (solo hay 1 firma)
  porcentajeCredito: 0,
  cobradoReal: 1, // 1 firma cobrada
  cobradoRealCLP: 41000000,
  cobranzaEsperada: 1, // Lo que deberíamos haber cobrado a la fecha
  cobranzaEsperadaCLP: 41000000,
  conversionReservasAFirmas: 7, // 1/14 * 100
  metaConversion: 65,
  formaPago: {
    contado: 1,
    contadoCLP: 41000000,
    credito: 0,
    creditoCLP: 0,
    hipotecario: 0,
    hipotecarioCLP: 0,
  },
  hipotecariosPendientesCLP: 0, // No hay hipotecarios pendientes
  diasTramitacionHipotecario: 0, // No hay tramitaciones
  metaDiasTramitacionHipotecario: 45,
  otros: {
    conversion: 7.1,
    promedioReserva: 50542857, // 707.600.000 / 14
    ticketPromedio: 41000000,
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
