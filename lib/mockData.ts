import { KPIData } from './excelService';

export const mockKPIData: KPIData = {
  metaDelMes: 25,
  metaDelMesCLP: 713800000,
  metaReservas: 45,
  metaReservasCLP: 1383899997,
  reservasDelMes: 45, // 45 unidades
  reservasDelMesCLP: 1790300000, // $1.790.300.000 (precio promedio: $39.784.444)
  firmasDelMes: 28, // 28 unidades
  firmasDelMesCLP: 1112600000, // $1.112.600.000 (precio promedio: $39.735.714)
  desistimientosDelMes: 10, // 10 unidades
  desistimientosDelMesCLP: 468000000, // $468.000.000 (ticket promedio: $46.800.000)
  diasFirmasDelMes: 25.1, // 25.1 días a firma
  metaDiasFirmas: 20, // Meta es 20 días
  porcentajeDesistimientos: 35.0, // 35.0% de desistimientos acumulado
  metaPorcentajeDesistimientos: 28, // Meta máxima 28%
  porcentajeContado: 60.0, // 60.0% contado
  porcentajeCredito: 30.0, // 30.0% crédito directo
  porcentajeHipotecario: 10.0, // 10.0% crédito hipotecario
  cobradoReal: 0, // Sin unidades específicas
  cobradoRealCLP: 3170469, // Cuotas del mes ya pagadas: $3.170.469
  cobranzaEsperada: 0, // Sin unidades específicas
  cobranzaEsperadaCLP: 84877494, // Deberíamos recaudar del mes: $84.877.494 | Pendiente: $81.707.025
  conversionReservasAFirmas: 17.9, // 17.9% conversión del mes (5 firmas de 45 reservas del mes)
  metaConversion: 65,
  formaPago: {
    contado: 17, // 60% contado (~17 unidades de 28)
    contadoCLP: 667560000, // 60% de 1.112.600.000
    credito: 8, // 30% crédito directo (~8 unidades de 28)
    creditoCLP: 333780000, // 30% de 1.112.600.000
    hipotecario: 3, // 10% crédito hipotecario (~3 unidades de 28)
    hipotecarioCLP: 111260000, // 10% de 1.112.600.000
  },
  hipotecariosPendientesCLP: 0,
  diasTramitacionHipotecario: 170, // 170 días de tramitación hipotecario
  metaDiasTramitacionHipotecario: 45,
  otros: {
    conversion: 17.9,
    promedioReserva: 39784444, // 1.790.300.000 / 45
    ticketPromedio: 39735714, // 1.112.600.000 / 28
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
    porcentajeHipotecario: firmas > 0 ? Math.round((hipotecario / firmas) * 100) : 0,
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
