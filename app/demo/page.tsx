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

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setKpiData(mockKPIData); // Usar datos fijos, no aleatorios
      setIsLoading(false);
    }, 1000);
  };

  // Auto-refresh desactivado - datos fijos
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setKpiData(generateRandomKPIData());
  //   }, 30000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="h-screen overflow-hidden bg-emerald-900">
      <div className="container mx-auto px-2 py-1 max-w-7xl h-full flex flex-col">
        {/* Header ejecutivo - MÁS COMPACTO */}
        <div className="flex items-center justify-between mb-1 flex-shrink-0">
          <div>
            <h1 className="text-base font-bold text-white">KPIs Dashboard</h1>
            <p className="text-[10px] text-gray-400">Actualizado: {new Date().toLocaleString('es-CL', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold disabled:opacity-50 transition-all flex items-center gap-1"
          >
            <svg className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>

        {/* Primera fila: Meta, Reservas, Firmas, Desistimientos - MÁS COMPACTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-1.5 flex-shrink-0">
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
            additionalInfo={`${kpiData.porcentajeDesistimientos}% del total (Meta: ${kpiData.metaPorcentajeDesistimientos}% máx.)`}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
            variant="danger"
            delay={0.3}
          />
        </div>

        {/* Segunda fila: Tabla ejecutiva - MÁS COMPACTA */}
        <div className="bg-white rounded-lg p-1.5 shadow-lg flex-shrink-0">
          <div className="grid grid-cols-6 gap-2">
            {/* 1. Días Firmas */}
            <div className="border-r border-gray-200 pr-2">
              <div className="text-[10px] text-gray-500 uppercase mb-1 font-semibold">Días Firmas</div>
              <div className="text-2xl font-black text-gray-900 mb-0.5">{kpiData.diasFirmasDelMes}</div>
              <div className="text-[10px] text-gray-600 font-semibold mb-1">Meta: {kpiData.metaDiasFirmas} días</div>
              <div className="flex items-center gap-1">
                <div className={`text-[10px] font-bold ${kpiData.diasFirmasDelMes <= kpiData.metaDiasFirmas ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.diasFirmasDelMes <= kpiData.metaDiasFirmas ? '▼' : '▲'} {Math.abs(Math.round(((kpiData.diasFirmasDelMes - kpiData.metaDiasFirmas) / kpiData.metaDiasFirmas) * 100))}% vs meta
                </div>
              </div>
            </div>

            {/* 2. Desistimientos % */}
            <div className="border-r border-gray-200 pr-2">
              <div className="text-[10px] text-gray-500 uppercase mb-1 font-semibold">Desist. %</div>
              <div className="text-2xl font-black text-gray-900 mb-0.5">{kpiData.porcentajeDesistimientos}%</div>
              <div className="text-[10px] text-gray-600 font-semibold mb-1">Meta: {kpiData.metaPorcentajeDesistimientos}% máx.</div>
              <div className="flex items-center gap-1">
                <div className={`text-[10px] font-bold ${kpiData.porcentajeDesistimientos <= kpiData.metaPorcentajeDesistimientos ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.porcentajeDesistimientos <= kpiData.metaPorcentajeDesistimientos ? '▼' : '▲'} {Math.abs(kpiData.porcentajeDesistimientos - kpiData.metaPorcentajeDesistimientos)}% vs meta
                </div>
              </div>
            </div>

            {/* 3. Distribución Pagos */}
            <div className="border-r border-gray-200 pr-2">
              <div className="text-[10px] text-gray-500 uppercase mb-1 font-semibold">Forma de Pago</div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-[10px] text-gray-600">Contado:</span>
                  </div>
                  <span className="text-sm font-black text-green-600">{Math.round((kpiData.formaPago.contado / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                    <span className="text-[10px] text-gray-600">Créd. Dir:</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">{Math.round((kpiData.formaPago.credito / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-[10px] text-gray-600">Créd. Hip:</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">{Math.round((kpiData.formaPago.hipotecario / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* 4. Cobranza */}
            <div className="border-r border-gray-200 pr-2">
              <div className="text-[10px] text-gray-500 uppercase mb-1 font-semibold">Cobranza</div>
              <div className="text-2xl font-black text-gray-900 mb-0.5">{kpiData.cobradoReal}</div>
              <div className="text-[10px] text-gray-600 mb-1 font-semibold">${(kpiData.cobradoRealCLP / 1000000).toFixed(0)}M cobrado</div>
              <div className="text-[10px] text-gray-600">Esp: {kpiData.cobranzaEsperada} u.</div>
              <div className={`text-[10px] font-bold ${kpiData.cobradoReal >= kpiData.cobranzaEsperada ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.cobradoReal >= kpiData.cobranzaEsperada ? '+' : ''}{kpiData.cobradoReal - kpiData.cobranzaEsperada}
              </div>
            </div>

            {/* 5. Conversión */}
            <div className="border-r border-gray-200 pr-2">
              <div className="text-[10px] text-gray-500 uppercase mb-1 font-semibold">Conversión</div>
              <div className="text-2xl font-black text-gray-900 mb-0.5">{kpiData.conversionReservasAFirmas}%</div>
              <div className="text-[10px] text-gray-600 mb-1 font-semibold">res → firmas</div>
              <div className={`text-[10px] font-bold ${kpiData.conversionReservasAFirmas >= kpiData.metaConversion ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.conversionReservasAFirmas >= kpiData.metaConversion ? '+' : ''}{kpiData.conversionReservasAFirmas - kpiData.metaConversion}% vs meta
              </div>
            </div>

            {/* 6. Hipotecarios */}
            <div>
              <div className="text-[10px] text-gray-500 uppercase mb-1 font-semibold">Hipotecarios</div>
              <div className="text-2xl font-black text-gray-900 mb-0.5">{kpiData.diasTramitacionHipotecario}</div>
              <div className="text-[10px] text-gray-600 mb-1 font-semibold">días tram.</div>
              <div className="text-[10px] text-gray-600">${(kpiData.hipotecariosPendientesCLP / 1000000).toFixed(0)}M pend.</div>
              <div className={`text-[10px] font-bold ${kpiData.diasTramitacionHipotecario <= kpiData.metaDiasTramitacionHipotecario ? 'text-green-600' : 'text-red-600'}`}>
                Meta: {kpiData.metaDiasTramitacionHipotecario}d
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos - MÁS COMPACTOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 mt-1.5 flex-1 min-h-0">
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
