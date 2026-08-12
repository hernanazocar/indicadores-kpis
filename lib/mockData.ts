import { KPIData } from './excelService';

export const mockKPIData: KPIData = {
  metaDelMes: 30,
  metaDelMesCLP: 922599998,
  reservasDelMes: 14,
  reservasDelMesCLP: 764500000,
  firmasDelMes: 6,
  firmasDelMesCLP: 255100000,
  desistimientosDelMes: 9,
  desistimientosDelMesCLP: 224000000,
  diasFirmasDelMes: 25, // Vamos en 25 días
  metaDiasFirmas: 22, // Meta es 22 días
  porcentajeDesistimientos: 38, // 38.1% según cálculo específico
  metaPorcentajeDesistimientos: 32, // Meta máxima 32%
  porcentajeContado: 100, // 100% contado
  porcentajeCredito: 0, // 0% crédito directo
  cobradoReal: 0, // Sin unidades específicas
  cobradoRealCLP: 20368430, // Realmente recaudado
  cobranzaEsperada: 0, // Sin unidades específicas
  cobranzaEsperadaCLP: 92296645, // Deberíamos recaudar este mes
  conversionReservasAFirmas: 0, // Conversión 0% - firmas del mes sobre reservas del mes
  metaConversion: 65,
  formaPago: {
    contado: 6, // 100% contado
    contadoCLP: 255100000,
    credito: 0, // 0% crédito directo
    creditoCLP: 0,
    hipotecario: 0, // 0% crédito hipotecario
    hipotecarioCLP: 0,
  },
  hipotecariosPendientesCLP: 0,
  diasTramitacionHipotecario: 0,
  metaDiasTramitacionHipotecario: 45,
  otros: {
    conversion: 0,
    promedioReserva: 54607143,
    ticketPromedio: 42516667, // 255.100.000 / 6
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
