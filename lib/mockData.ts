import { KPIData } from './excelService';

export const mockKPIData: KPIData = {
  metaDelMes: 50,
  metaDelMesCLP: 6250000000, // 50 * 125M promedio
  reservasDelMes: 45,
  reservasDelMesCLP: 5625000000, // 45 * 125M promedio
  firmasDelMes: 32,
  firmasDelMesCLP: 4000000000, // 32 * 125M promedio
  desistimientosDelMes: 5,
  desistimientosDelMesCLP: 625000000, // 5 * 125M promedio
  diasFirmasDelMes: 7,
  metaDiasFirmas: 30,
  porcentajeDesistimientos: 11, // 5/45 * 100
  metaPorcentajeDesistimientos: 10,
  porcentajeContado: 37, // 12/32 * 100
  porcentajeCredito: 47, // 15/32 * 100
  cobradoReal: 18, // Lo que realmente se ha cobrado
  cobradoRealCLP: 2250000000,
  cobranzaEsperada: 25, // Lo que deberíamos haber cobrado a la fecha
  cobranzaEsperadaCLP: 3125000000,
  conversionReservasAFirmas: 71, // 32/45 * 100
  metaConversion: 65,
  formaPago: {
    contado: 12,
    contadoCLP: 1500000000, // 12 * 125M
    credito: 15,
    creditoCLP: 1875000000, // 15 * 125M
    hipotecario: 5,
    hipotecarioCLP: 625000000, // 5 * 125M
  },
  hipotecariosPendientesCLP: 1000000000, // Plata pendiente de cobro
  diasTramitacionHipotecario: 38, // Días promedio de tramitación
  metaDiasTramitacionHipotecario: 45, // Meta: máximo 45 días
  otros: {
    conversion: 71.1,
    promedioReserva: 125000000,
    ticketPromedio: 98500000,
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
