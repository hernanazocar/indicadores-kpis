'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns/format';

interface HeaderProps {
  lastUpdate: string;
  isLoading: boolean;
  onRefresh: () => void;
}

export default function Header({ lastUpdate, isLoading, onRefresh }: HeaderProps) {
  const formattedDate = lastUpdate
    ? format(new Date(lastUpdate), "dd/MM/yyyy HH:mm:ss")
    : 'No disponible';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border-2 border-emerald-200 shadow-sm mb-3 overflow-hidden flex-shrink-0"
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo/Icono */}
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Indicadores KPIs
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{formattedDate}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-lg font-semibold text-xs
              bg-emerald-500 hover:bg-emerald-600 text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 shadow-sm hover:shadow-md
            `}
          >
            <svg
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline text-xs">{isLoading ? 'Actualizando...' : 'Actualizar'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
