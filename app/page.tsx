'use client';

import { useEffect, useState, useCallback } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '@/lib/msalConfig';
import { ExcelService, KPIData } from '@/lib/excelService';
import Header from '@/components/Header';
import KPICard from '@/components/KPICard';
import MetaCard from '@/components/MetaCard';
import PaymentMethodChart from '@/components/PaymentMethodChart';
import MonthlyTrendChart from '@/components/MonthlyTrendChart';

export default function Home() {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializar MSAL
  useEffect(() => {
    const initializeMsal = async () => {
      const pca = new PublicClientApplication(msalConfig);
      await pca.initialize();
      setMsalInstance(pca);

      const accounts = pca.getAllAccounts();
      if (accounts.length > 0) {
        setIsAuthenticated(true);
      }
    };

    initializeMsal();
  }, []);

  // Función para hacer login
  const handleLogin = async () => {
    if (!msalInstance) return;

    try {
      const response = await msalInstance.loginPopup(loginRequest);
      setIsAuthenticated(true);
      await fetchKPIData(response.accessToken);
    } catch (error) {
      console.error('Login error:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  // Función para obtener datos
  const fetchKPIData = useCallback(async (accessToken?: string) => {
    if (!msalInstance) return;

    setIsLoading(true);
    setError(null);

    try {
      let token = accessToken;

      if (!token) {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) {
          setError('No hay sesión activa. Por favor, inicia sesión.');
          return;
        }

        const response = await msalInstance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });
        token = response.accessToken;
      }

      const excelService = new ExcelService(token!);
      const data = await excelService.getKPIData();
      setKpiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al obtener los datos. Verifica tu conexión y configuración.');
    } finally {
      setIsLoading(false);
    }
  }, [msalInstance]);

  // Auto-refresh
  useEffect(() => {
    if (!isAuthenticated) return;

    fetchKPIData();

    const refreshInterval = parseInt(process.env.NEXT_PUBLIC_REFRESH_INTERVAL || '300000');
    const interval = setInterval(() => {
      fetchKPIData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isAuthenticated, fetchKPIData]);

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 shadow-xl border border-slate-200 dark:border-slate-700 max-w-md w-full">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Indicadores KPIs
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Conecta con tu cuenta de Microsoft para ver los indicadores en tiempo real
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
              </svg>
              Iniciar sesión con Microsoft
            </button>

            <a
              href="/demo"
              className="block w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 text-center"
            >
              Probar con datos de ejemplo
            </a>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">
            ¿No tienes configurado Azure? Usa el modo demo para probar el dashboard
          </p>
        </div>
      </div>
    );
  }

  // Pantalla de carga inicial
  if (!kpiData && isLoading) {
    return (
      <div className="min-h-screen bg-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Cargando indicadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-3 max-w-7xl h-full flex flex-col">
        {/* Header ejecutivo */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-white">KPIs Dashboard</h1>
            <p className="text-xs text-gray-400">Actualizado: {kpiData?.ultimaActualizacion ? new Date(kpiData.ultimaActualizacion).toLocaleString('es-CL', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
          </div>
          <button
            onClick={() => fetchKPIData()}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>

        {error && (
          <div className="mb-3 p-3 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {kpiData && (
          <>
            {/* Primera fila: Meta, Reservas, Firmas, Desistimientos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3 flex-shrink-0">
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
            <div className="bg-white rounded-lg p-4 shadow-lg flex-shrink-0">
              <div className="grid grid-cols-6 gap-4">
                {/* 1. Días Firmas */}
                <div className="border-r border-gray-200 pr-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Días Firmas</div>
                  <div className="text-3xl font-black text-gray-900">{kpiData.diasFirmasDelMes}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className={`text-xs font-bold ${kpiData.diasFirmasDelMes <= kpiData.metaDiasFirmas ? 'text-green-600' : 'text-red-600'}`}>
                      {kpiData.diasFirmasDelMes <= kpiData.metaDiasFirmas ? '▼' : '▲'} {Math.abs(Math.round(((kpiData.diasFirmasDelMes - kpiData.metaDiasFirmas) / kpiData.metaDiasFirmas) * 100))}%
                    </div>
                    <div className="text-xs text-gray-400">vs meta</div>
                  </div>
                </div>

                {/* 2. Desistimientos % */}
                <div className="border-r border-gray-200 pr-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Desist. %</div>
                  <div className="text-3xl font-black text-gray-900">{kpiData.porcentajeDesistimientos}%</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className={`text-xs font-bold ${kpiData.porcentajeDesistimientos <= kpiData.metaPorcentajeDesistimientos ? 'text-green-600' : 'text-red-600'}`}>
                      {kpiData.porcentajeDesistimientos <= kpiData.metaPorcentajeDesistimientos ? '▼' : '▲'} {Math.abs(kpiData.porcentajeDesistimientos - kpiData.metaPorcentajeDesistimientos)}%
                    </div>
                    <div className="text-xs text-gray-400">vs meta</div>
                  </div>
                </div>

                {/* 3. Contado */}
                <div className="border-r border-gray-200 pr-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Contado</div>
                  <div className="text-3xl font-black text-gray-900">{Math.round((kpiData.formaPago.contado / Math.max(1, kpiData.formaPago.contado + kpiData.formaPago.credito + kpiData.formaPago.hipotecario)) * 100)}%</div>
                  <div className="text-xs text-gray-500 mt-1">{kpiData.formaPago.contado} unidades</div>
                </div>

                {/* 4. Cobranza */}
                <div className="border-r border-gray-200 pr-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Cobranza</div>
                  <div className="text-3xl font-black text-gray-900">{kpiData.cobradoReal}</div>
                  <div className="text-xs text-gray-500 mt-1">${(kpiData.cobradoRealCLP / 1000000).toFixed(0)}M</div>
                </div>

                {/* 5. Conversión */}
                <div className="border-r border-gray-200 pr-4">
                  <div className="text-xs text-gray-500 uppercase mb-1">Conversión</div>
                  <div className="text-3xl font-black text-gray-900">{kpiData.conversionReservasAFirmas}%</div>
                  <div className={`text-xs font-bold mt-1 ${kpiData.conversionReservasAFirmas >= kpiData.metaConversion ? 'text-green-600' : 'text-red-600'}`}>
                    {kpiData.conversionReservasAFirmas >= kpiData.metaConversion ? '+' : ''}{kpiData.conversionReservasAFirmas - kpiData.metaConversion}% vs meta
                  </div>
                </div>

                {/* 6. Hipotecarios */}
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Hipotec.</div>
                  <div className="text-3xl font-black text-gray-900">{kpiData.diasTramitacionHipotecario}</div>
                  <div className="text-xs text-gray-500 mt-1">días trámite</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
