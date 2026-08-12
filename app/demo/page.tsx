'use client';

import { useEffect, useState } from 'react';
import { mockKPIData, generateRandomKPIData } from '@/lib/mockData';
import { KPIData } from '@/lib/excelService';
import Header from '@/components/Header';
import KPICard from '@/components/KPICard';
import MetaCard from '@/components/MetaCard';

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
      <div className="container mx-auto px-2 py-0.5 max-w-7xl h-full flex flex-col">
        {/* Header ejecutivo */}
        <div className="flex items-center justify-between mb-1 flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-white">Inmobiliaria Chicureo</h1>
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

        {/* Primera fila: Meta, Reservas, Firmas, Desistimientos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-1.5 flex-shrink-0">
          <MetaCard
            value={kpiData.metaDelMes}
            valueCLP={kpiData.metaDelMesCLP}
            delay={0}
          />
          <KPICard
            title="Reservas del Mes"
            value={kpiData.reservasDelMes}
            valueCLP={kpiData.reservasDelMesCLP}
            metaValue={kpiData.metaReservas}
            metaValueCLP={kpiData.metaReservasCLP}
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

        {/* Segunda fila: Tabla ejecutiva */}
        <div className="bg-white rounded-lg p-1.5 shadow-lg flex-shrink-0 mb-1">
          <div className="grid grid-cols-6 gap-2">
            {/* 1. Días Firmas */}
            <div className="border-r border-gray-200 pr-3">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs text-gray-500 uppercase font-semibold">Días Firmas</div>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.diasFirmasDelMes}</div>
              <div className="text-[10px] text-gray-600 font-semibold mb-1">Meta: {kpiData.metaDiasFirmas} días</div>
              <div className={`text-[10px] font-bold ${kpiData.diasFirmasDelMes <= kpiData.metaDiasFirmas ? 'text-green-600' : 'text-red-600'}`}>
                {Math.round((kpiData.metaDiasFirmas / kpiData.diasFirmasDelMes) * 100)}% cumplimiento
              </div>
            </div>

            {/* 2. Desistimientos % */}
            <div className="border-r border-gray-200 pr-3">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-xs text-gray-500 uppercase font-semibold">Desistimientos %</div>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.porcentajeDesistimientos}%</div>
              <div className="text-[10px] text-gray-600 font-semibold mb-1">Meta: {kpiData.metaPorcentajeDesistimientos}%</div>
              <div className={`text-[10px] font-bold ${kpiData.porcentajeDesistimientos <= kpiData.metaPorcentajeDesistimientos ? 'text-green-600' : 'text-red-600'}`}>
                {Math.round((kpiData.metaPorcentajeDesistimientos / kpiData.porcentajeDesistimientos) * 100)}% cumplimiento
              </div>
            </div>

            {/* 3. Distribución Pagos */}
            <div className="border-r border-gray-200 pr-3">
              <div className="flex items-center gap-1.5 mb-0.5">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <div className="text-xs text-gray-500 uppercase font-semibold">Forma de Pago</div>
              </div>
              <div className="space-y-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-600 font-semibold">Contado:</span>
                  <span className="text-2xl font-black text-green-600">{Math.round((kpiData.formaPago.contado / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-600 font-semibold">Créd. Directo:</span>
                  <span className="text-2xl font-black text-gray-900">{Math.round((kpiData.formaPago.credito / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-600 font-semibold">Créd. Hipotecario:</span>
                  <span className="text-2xl font-black text-gray-900">{Math.round((kpiData.formaPago.hipotecario / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* 4. Cobranza */}
            <div className="border-r border-gray-200 pr-3">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs text-gray-500 uppercase font-semibold">Cobranza</div>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{Math.round((kpiData.cobradoRealCLP / kpiData.cobranzaEsperadaCLP) * 100)}%</div>
              <div className="text-[10px] text-gray-600 font-semibold mb-0.5">Cobrado: ${kpiData.cobradoRealCLP.toLocaleString('es-CL')}</div>
              <div className="text-[10px] text-gray-600 mb-0.5">Esperado: ${kpiData.cobranzaEsperadaCLP.toLocaleString('es-CL')}</div>
              <div className={`text-[10px] font-bold ${kpiData.cobradoRealCLP >= kpiData.cobranzaEsperadaCLP ? 'text-green-600' : 'text-red-600'}`}>
                Gap: -${(kpiData.cobranzaEsperadaCLP - kpiData.cobradoRealCLP).toLocaleString('es-CL')}
              </div>
            </div>

            {/* 5. Conversión */}
            <div className="border-r border-gray-200 pr-3">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div className="text-xs text-gray-500 uppercase font-semibold">Conversión</div>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.conversionReservasAFirmas}%</div>
              <div className="text-[10px] text-gray-600 font-semibold mb-0.5">Reservas → Firmas</div>
              <div className="text-[9px] text-gray-500">
                0 firmas de {kpiData.reservasDelMes} reservas del mes
              </div>
            </div>

            {/* 6. Hipotecarios */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <div className="text-xs text-gray-500 uppercase font-semibold">Hipotecarios</div>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{kpiData.diasTramitacionHipotecario}</div>
              <div className="text-[10px] text-gray-600 font-semibold">Días tramitación</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
