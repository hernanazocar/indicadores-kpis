import { KPIData } from './excelService';

export const mockKPIData: KPIData = {
  metaDelMes: 30,
  metaDelMesCLP: 922599998,
  reservasDelMes: 14,
  reservasDelMesCLP: 764500000, // Estimado
  firmasDelMes: 2,
  firmasDelMesCLP: 75900000,
  desistimientosDelMes: 5,
  desistimientosDelMesCLP: 263400000, // Estimado: 5 * promedio
  diasFirmasDelMes: 0, // Sin firmas registradas aún con tiempo
  metaDiasFirmas: 22,
  porcentajeDesistimientos: 36, // 35.7% redondeado
  metaPorcentajeDesistimientos: 32, // Meta máxima
  porcentajeContado: 100, // 100% según tabla
  porcentajeCredito: 0, // 0% según tabla
  cobradoReal: 2, // 2 firmas cobradas
  cobradoRealCLP: 75900000,
  cobranzaEsperada: 2, // Lo que deberíamos haber cobrado a la fecha
  cobranzaEsperadaCLP: 75900000,
  conversionReservasAFirmas: 14, // 2/14 * 100 = 14.3%
  metaConversion: 65,
  formaPago: {
    contado: 2, // 100% contado
    contadoCLP: 75900000,
    credito: 0, // 0% crédito
    creditoCLP: 0,
    hipotecario: 0,
    hipotecarioCLP: 0,
  },
  hipotecariosPendientesCLP: 0, // No hay hipotecarios pendientes
  diasTramitacionHipotecario: 0, // No hay tramitaciones
  metaDiasTramitacionHipotecario: 45,
  otros: {
    conversion: 14.3,
    promedioReserva: 54607143, // 764.500.000 / 14
    ticketPromedio: 37950000, // 75.900.000 / 2
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
