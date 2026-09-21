'use client';

import { motion } from 'framer-motion';

interface MetaCardProps {
  value: number;
  valueCLP: number;
  delay?: number;
  firmasReales?: number;
  firmasRealesCLP?: number;
}

export default function MetaCard({ value, valueCLP, delay = 0, firmasReales, firmasRealesCLP }: MetaCardProps) {
  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calcular cumplimiento basado en CLP
  const cumplimiento = firmasRealesCLP && valueCLP ? Math.round((firmasRealesCLP / valueCLP) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="group h-full"
    >
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden transition-all duration-300 h-full hover:shadow-2xl shadow-xl border-l-4 border-white flex flex-col">
        <div className="p-2.5 flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/10 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wide">
                Meta del Mes
              </p>
            </div>

          </div>

          {/* Valores principales */}
          <div className="space-y-1 flex-1 flex flex-col justify-start min-h-0">
            {/* Unidades - MÁS GRANDE */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
              className="flex items-baseline gap-1.5"
            >
              <div className="text-3xl font-black text-white leading-none">
                {value.toLocaleString('es-CL')}
              </div>
              <div className="text-xs font-bold text-slate-300">
                unidades
              </div>
            </motion.div>

            {/* Valor CLP */}
            <div className="text-lg font-black text-white leading-tight">
              {formatCLP(valueCLP)}
            </div>

            {/* Porcentaje de cumplimiento */}
            {cumplimiento > 0 && (
              <div className="mt-2.5 pt-2.5 border-t-2 border-white/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-300 uppercase">Cumplimiento</span>
                  <span className={`text-lg font-black ${
                    cumplimiento >= 100 ? 'text-emerald-400' :
                    cumplimiento >= 90 ? 'text-blue-400' :
                    cumplimiento >= 70 ? 'text-amber-400' :
                    'text-slate-400'
                  }`}>
                    {cumplimiento}%
                  </span>
                </div>
                <div className="mt-1.5 bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(cumplimiento, 100)}%` }}
                    transition={{ duration: 1, delay: delay + 0.4 }}
                    className={`h-full rounded-full flex items-center justify-end pr-1.5 ${
                      cumplimiento >= 100 ? 'bg-emerald-500' :
                      cumplimiento >= 90 ? 'bg-blue-500' :
                      cumplimiento >= 70 ? 'bg-amber-500' :
                      'bg-slate-500'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-white">{cumplimiento}%</span>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
