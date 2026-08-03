'use client';

import { useEffect, useState } from 'react';
import { mockKPIData, generateRandomKPIData } from '@/lib/mockData';
import { KPIData } from '@/lib/excelService';
import Header from '@/components/Header';
import KPICard from '@/components/KPICard';
import MetaCard from '@/components/MetaCard';
import PaymentMethodChart from '@/components/PaymentMethodChart';
import MonthlyTrendChart from '@/components/MonthlyTrendChart';
import SecondaryMetricsChart from '@/components/SecondaryMetricsChart';

export default function DemoPage() {
  const [kpiData, setKpiData] = useState<KPIData>(mockKPIData);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setKpiData(generateRandomKPIData());
      setIsLoading(false);
    }, 1000);
  };

  // Auto-refresh cada 30 segundos en modo demo
  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(generateRandomKPIData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-emerald-900">
      <div className="container mx-auto px-3 py-2 max-w-7xl h-full flex flex-col">
        {/* Header ejecutivo */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-white">KPIs Dashboard</h1>
            <p className="text-xs text-gray-400">Actualizado: {new Date().toLocaleString('es-CL', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>

        {/* Primera fila: Meta, Reservas, Firmas, Desistimientos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2 flex-shrink-0">
          <MetaCard
            value={kpiData.metaDelMes}
            valueCLP={kpiData.metaDelMesCLP}
            delay={0}
          />
          <KPICard
            title="Reservas del Mes"
            value={kpiData.reservasDelMes}
            valueCLP={kpiData.reservasDelMesCLP}
            metaValue={kpiData.metaDelMes}
            metaValueCLP={kpiData.metaDelMesCLP}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            variant="primary"
            delay={0.1}
          />
          <KPICard
            title="Firmas del Mes"
            value={kpiData.firmasDelMes}
            valueCLP={kpiData.firmasDelMesCLP}
            metaValue={kpiData.metaDelMes}
            metaValueCLP={kpiData.metaDelMesCLP}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
            variant="success"
            delay={0.2}
          />
          <KPICard
            title="Desistimientos"
            value={kpiData.desistimientosDelMes}
            valueCLP={kpiData.desistimientosDelMesCLP}
            metaValue={kpiData.metaDelMes}
            metaValueCLP={kpiData.metaDelMesCLP}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
            variant="danger"
            delay={0.3}
          />
        </div>

        {/* Segunda fila: Tabla ejecutiva */}
        <div className="bg-white rounded-lg p-2 shadow-lg flex-shrink-0">
          <div className="grid grid-cols-6 gap-3">
            {/* 1. Días Firmas */}
            <div className="border-r border-gray-200 pr-4">
              <div className="text-xs text-gray-500 uppercase mb-2 font-semibold">Días Firmas</div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.diasFirmasDelMes}</div>
              <div className="flex items-center gap-1 mb-2">
                <div className={`text-xs font-bold ${kpiData.diasFirmasDelMes <= kpiData.metaDiasFirmas ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.diasFirmasDelMes <= kpiData.metaDiasFirmas ? '▼' : '▲'} {Math.abs(Math.round(((kpiData.diasFirmasDelMes - kpiData.metaDiasFirmas) / kpiData.metaDiasFirmas) * 100))}%
                </div>
                <div className="text-xs text-gray-400">vs meta</div>
              </div>
              <div className="text-xs text-gray-600 font-semibold">Meta: {kpiData.metaDiasFirmas} días</div>
            </div>

            {/* 2. Desistimientos % */}
            <div className="border-r border-gray-200 pr-4">
              <div className="text-xs text-gray-500 uppercase mb-2 font-semibold">Desist. %</div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.porcentajeDesistimientos}%</div>
              <div className="flex items-center gap-1 mb-2">
                <div className={`text-xs font-bold ${kpiData.porcentajeDesistimientos <= kpiData.metaPorcentajeDesistimientos ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.porcentajeDesistimientos <= kpiData.metaPorcentajeDesistimientos ? '▼' : '▲'} {Math.abs(kpiData.porcentajeDesistimientos - kpiData.metaPorcentajeDesistimientos)}%
                </div>
                <div className="text-xs text-gray-400">vs meta</div>
              </div>
              <div className="text-xs text-gray-600 font-semibold">{kpiData.desistimientosDelMes} casos</div>
            </div>

            {/* 3. Distribución Pagos */}
            <div className="border-r border-gray-200 pr-4">
              <div className="text-xs text-gray-500 uppercase mb-2 font-semibold">Forma de Pago</div>
              <div className="text-3xl font-black text-gray-900 mb-1">{Math.round((kpiData.formaPago.contado / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</div>
              <div className="text-xs text-gray-600 mb-1 font-semibold">Contado</div>
              <div className="text-xs text-gray-600">💳 Crédito: {Math.round((kpiData.formaPago.credito / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</div>
              <div className="text-xs text-gray-600">🏦 Hipotec: {Math.round((kpiData.formaPago.hipotecario / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</div>
            </div>

            {/* 4. Cobranza */}
            <div className="border-r border-gray-200 pr-4">
              <div className="text-xs text-gray-500 uppercase mb-2 font-semibold">Cobranza</div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.cobradoReal}</div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">${(kpiData.cobradoRealCLP / 1000000).toFixed(0)}M cobrado</div>
              <div className="text-xs text-gray-600">Esperado: {kpiData.cobranzaEsperada} u.</div>
              <div className={`text-xs font-bold ${kpiData.cobradoReal >= kpiData.cobranzaEsperada ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.cobradoReal >= kpiData.cobranzaEsperada ? '+' : ''}{kpiData.cobradoReal - kpiData.cobranzaEsperada} unid.
              </div>
            </div>

            {/* 5. Conversión */}
            <div className="border-r border-gray-200 pr-4">
              <div className="text-xs text-gray-500 uppercase mb-2 font-semibold">Conversión</div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.conversionReservasAFirmas}%</div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">reservas → firmas</div>
              <div className={`text-xs font-bold ${kpiData.conversionReservasAFirmas >= kpiData.metaConversion ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.conversionReservasAFirmas >= kpiData.metaConversion ? '+' : ''}{kpiData.conversionReservasAFirmas - kpiData.metaConversion}% vs meta
              </div>
            </div>

            {/* 6. Hipotecarios */}
            <div>
              <div className="text-xs text-gray-500 uppercase mb-2 font-semibold">Hipotecarios</div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.diasTramitacionHipotecario}</div>
              <div className="text-xs text-gray-600 mb-2 font-semibold">días tramitación</div>
              <div className="text-xs text-gray-600">${(kpiData.hipotecariosPendientesCLP / 1000000).toFixed(0)}M pend.</div>
              <div className={`text-xs font-bold ${kpiData.diasTramitacionHipotecario <= kpiData.metaDiasTramitacionHipotecario ? 'text-green-600' : 'text-red-600'}`}>
                Meta: {kpiData.metaDiasTramitacionHipotecario}d
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2 flex-1 min-h-0">
          <MonthlyTrendChart
            data={{
              reservasDelMes: kpiData.reservasDelMes,
              firmasDelMes: kpiData.firmasDelMes,
              desistimientosDelMes: kpiData.desistimientosDelMes,
            }}
            meta={kpiData.metaDelMes}
          />
          <SecondaryMetricsChart
            data={{
              diasFirmas: kpiData.diasFirmasDelMes,
              desistimientosPorcentaje: kpiData.porcentajeDesistimientos,
              contadoPorcentaje: Math.round((kpiData.formaPago.contado / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100),
              cobranza: kpiData.cobradoReal,
              conversion: kpiData.conversionReservasAFirmas,
              hipotecariosDias: kpiData.diasTramitacionHipotecario,
            }}
          />
        </div>
      </div>
    </div>
  );
}
