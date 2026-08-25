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

  // Calcular cumplimiento basado en CLP (más preciso)
  const cumplimiento = firmasRealesCLP && valueCLP ? Math.round((firmasRealesCLP / valueCLP) * 100) : 0;

  // Determinar badge según cumplimiento (versión oscura)
  const getBadgeConfig = () => {
    if (cumplimiento >= 100) {
      return {
        text: 'OBJETIVO ALCANZADO',
        bgColor: 'bg-emerald-500/20',
        textColor: 'text-emerald-300',
        borderColor: 'border-emerald-500/30',
        icon: (
          <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ),
      };
    } else if (cumplimiento >= 90) {
      return {
        text: 'CASI LOGRADO',
        bgColor: 'bg-blue-500/20',
        textColor: 'text-blue-300',
        borderColor: 'border-blue-500/30',
        icon: (
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        ),
      };
    } else if (cumplimiento >= 70) {
      return {
        text: `${cumplimiento}% EN PROGRESO`,
        bgColor: 'bg-amber-500/20',
        textColor: 'text-amber-300',
        borderColor: 'border-amber-500/30',
        icon: (
          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        ),
      };
    } else {
      return {
        text: `${cumplimiento}% OBJETIVO`,
        bgColor: 'bg-slate-500/20',
        textColor: 'text-slate-300',
        borderColor: 'border-slate-500/30',
        icon: (
          <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        ),
      };
    }
  };

  const badgeConfig = getBadgeConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="group h-full"
    >
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden transition-all duration-300 h-full hover:shadow-2xl shadow-xl border-l-4 border-white">
        <div className="p-2">
          {/* Header con título y badge */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-lg bg-white/10 flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold text-white uppercase tracking-wide">
                Meta del Mes
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: delay + 0.2 }}
              className={`px-3 py-1 rounded-md text-[10px] font-semibold ${badgeConfig.bgColor} ${badgeConfig.textColor} border ${badgeConfig.borderColor} flex items-center gap-1.5`}
            >
              {badgeConfig.icon}
              <span>{badgeConfig.text}</span>
            </motion.div>
          </div>

          {/* Valores principales */}
          <div className="space-y-0.5">
            {/* Unidades */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
              className="flex items-baseline gap-1"
            >
              <div className="text-3xl font-black text-white">
                {value.toLocaleString('es-CL')}
              </div>
              <div className="text-xs font-semibold text-slate-300">
                unidades
              </div>
            </motion.div>

            {/* Valor CLP */}
            <div className="text-2xl font-black text-white leading-tight">
              {formatCLP(valueCLP)}
            </div>

            {/* Porcentaje de cumplimiento si hay datos */}
            {cumplimiento > 0 && (
              <div className="mt-1.5 pt-1.5 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-semibold text-slate-400 uppercase">Cumplimiento</span>
                  <span className={`text-xs font-bold ${
                    cumplimiento >= 100 ? 'text-emerald-400' :
                    cumplimiento >= 90 ? 'text-blue-400' :
                    cumplimiento >= 70 ? 'text-amber-400' :
                    'text-slate-400'
                  }`}>
                    {cumplimiento}%
                  </span>
                </div>
                <div className="mt-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(cumplimiento, 100)}%` }}
                    transition={{ duration: 1, delay: delay + 0.4 }}
                    className={`h-full rounded-full ${
                      cumplimiento >= 100 ? 'bg-emerald-500' :
                      cumplimiento >= 90 ? 'bg-blue-500' :
                      cumplimiento >= 70 ? 'bg-amber-500' :
                      'bg-slate-500'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
