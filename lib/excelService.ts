import { Client } from '@microsoft/microsoft-graph-client';

export interface KPIData {
  metaDelMes: number;
  metaDelMesCLP: number;
  metaReservas: number;
  metaReservasCLP: number;
  reservasDelMes: number;
  reservasDelMesCLP: number;
  firmasDelMes: number;
  firmasDelMesCLP: number;
  desistimientosDelMes: number;
  desistimientosDelMesCLP: number;
  diasFirmasDelMes: number;
  metaDiasFirmas: number;
  porcentajeDesistimientos: number;
  metaPorcentajeDesistimientos: number;
  porcentajeContado: number;
  porcentajeCredito: number;
  cobradoReal: number;
  cobradoRealCLP: number;
  cobranzaEsperada: number;
  cobranzaEsperadaCLP: number;
  conversionReservasAFirmas: number;
  metaConversion: number;
  formaPago: {
    contado: number;
    contadoCLP: number;
    credito: number;
    creditoCLP: number;
    hipotecario: number;
    hipotecarioCLP: number;
  };
  hipotecariosPendientesCLP: number;
  diasTramitacionHipotecario: number;
  metaDiasTramitacionHipotecario: number;
  otros: Record<string, number>;
  ultimaActualizacion: string;
}

export class ExcelService {
  private client: Client;

  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }

  async getKPIData(): Promise<KPIData> {
    try {
      const fileId = process.env.NEXT_PUBLIC_EXCEL_FILE_ID;
      const sheetName = process.env.NEXT_PUBLIC_EXCEL_SHEET_NAME || 'Hoja1';

      // Leer rango de datos del Excel
      // Asumiendo estructura:
      // A1: Métrica | B1: Valor
      // A2: Reservas del Mes | B2: 45
      // A3: Firmas del Mes | B3: 32
      // etc...

      const range = await this.client
        .api(`/me/drive/items/${fileId}/workbook/worksheets/${sheetName}/range(address='A1:C20')`)
        .get();

      const values = range.values;

      // Parsear los datos del Excel
      const data: any = {};
      for (let i = 0; i < values.length; i++) {
        const key = values[i][0];
        const valueUnits = values[i][1];
        const valueCLP = values[i][2];

        if (key && valueUnits !== null && valueUnits !== undefined) {
          const normalizedKey = this.normalizeKey(key);
          data[normalizedKey] = typeof valueUnits === 'string' ? parseFloat(valueUnits) || valueUnits : valueUnits;

          // Si hay valor CLP, guardarlo también
          if (valueCLP !== null && valueCLP !== undefined) {
            data[normalizedKey + 'CLP'] = typeof valueCLP === 'string' ? parseFloat(valueCLP) || valueCLP : valueCLP;
          }
        }
      }

      const firmas = data.firmasDelMes || data.firmas || 0;
      const reservas = data.reservasDelMes || data.reservas || 0;
      const desistimientos = data.desistimientosDelMes || data.desistimientos || 0;
      const contado = data.contado || 0;
      const credito = data.credito || 0;
      const totalVentas = firmas > 0 ? firmas : 1;

      return {
        metaDelMes: data.metaDelMes || data.meta || 0,
        metaDelMesCLP: data.metaDelMesCLP || data.metaCLP || 0,
        metaReservas: data.metaReservas || data.metaDelMes || data.meta || 0,
        metaReservasCLP: data.metaReservasCLP || data.metaDelMesCLP || data.metaCLP || 0,
        reservasDelMes: reservas,
        reservasDelMesCLP: data.reservasDelMesCLP || data.reservasCLP || 0,
        firmasDelMes: firmas,
        firmasDelMesCLP: data.firmasDelMesCLP || data.firmasCLP || 0,
        desistimientosDelMes: desistimientos,
        desistimientosDelMesCLP: data.desistimientosDelMesCLP || data.desistimientosCLP || 0,
        diasFirmasDelMes: data.diasFirmasDelMes || data.diasFirmas || 0,
        metaDiasFirmas: data.metaDiasFirmas || data.metaDias || 30,
        porcentajeDesistimientos: reservas > 0 ? Math.round((desistimientos / reservas) * 100) : 0,
        metaPorcentajeDesistimientos: data.metaPorcentajeDesistimientos || data.metaDesistimientos || 10,
        porcentajeContado: totalVentas > 0 ? Math.round((contado / totalVentas) * 100) : 0,
        porcentajeCredito: totalVentas > 0 ? Math.round((credito / totalVentas) * 100) : 0,
        cobradoReal: data.cobradoReal || data.cobrado || 0,
        cobradoRealCLP: data.cobradoRealCLP || data.cobradoCLP || 0,
        cobranzaEsperada: data.cobranzaEsperada || data.cobranza || 0,
        cobranzaEsperadaCLP: data.cobranzaEsperadaCLP || data.cobranzaCLP || 0,
        conversionReservasAFirmas: reservas > 0 ? Math.round((firmas / reservas) * 100) : 0,
        metaConversion: data.metaConversion || 65,
        formaPago: {
          contado: data.contado || 0,
          contadoCLP: data.contadoCLP || 0,
          credito: data.credito || 0,
          creditoCLP: data.creditoCLP || 0,
          hipotecario: data.hipotecario || 0,
          hipotecarioCLP: data.hipotecarioCLP || 0,
        },
        hipotecariosPendientesCLP: data.hipotecariosPendientesCLP || data.pendientesCLP || 0,
        diasTramitacionHipotecario: data.diasTramitacionHipotecario || data.diasTramitacion || 0,
        metaDiasTramitacionHipotecario: data.metaDiasTramitacionHipotecario || data.metaTramitacion || 45,
        otros: {
          conversion: data.conversion || 0,
          promedioReserva: data.promedioReserva || 0,
          ...data.otros,
        },
        ultimaActualizacion: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching Excel data:', error);
      throw error;
    }
  }

  private normalizeKey(key: string): string {
    return key
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[áàäâ]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöô]/g, 'o')
      .replace(/[úùüû]/g, 'u');
  }

  async testConnection(): Promise<boolean> {
    try {
      const fileId = process.env.NEXT_PUBLIC_EXCEL_FILE_ID;
      await this.client.api(`/me/drive/items/${fileId}`).get();
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}
