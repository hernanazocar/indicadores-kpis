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

  // Calcular cumplimiento
  const cumplimiento = firmasReales && value ? Math.round((firmasReales / value) * 100) : 0;

  // Determinar badge según cumplimiento
  const getBadgeConfig = () => {
    if (cumplimiento >= 100) {
      return {
        text: 'META CUMPLIDA',
        bgColor: 'bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600',
        textColor: 'text-white',
        isSuccess: true,
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ),
      };
    } else if (cumplimiento >= 90) {
      return {
        text: '⚡ CASI LOGRADO',
        bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        textColor: 'text-white',
        isSuccess: false,
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        ),
      };
    } else if (cumplimiento >= 70) {
      return {
        text: `${cumplimiento}% EN PROGRESO`,
        bgColor: 'bg-gradient-to-r from-amber-400 to-orange-500',
        textColor: 'text-slate-900',
        isSuccess: false,
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        ),
      };
    } else {
      return {
        text: `${cumplimiento}% OBJETIVO`,
        bgColor: 'bg-gradient-to-r from-slate-200 to-slate-300',
        textColor: 'text-slate-900',
        isSuccess: false,
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        ),
      };
    }
  };

  const badgeConfig = getBadgeConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="group"
    >
      <div className="relative bg-slate-800 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl border-l-8 border-white h-full">
        <div className="relative p-2.5 h-full flex flex-col">
          {/* Icono y título */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-lg bg-white/10 flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Meta del Mes
              </p>
            </div>
            {badgeConfig.isSuccess ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: 0,
                }}
                transition={{
                  scale: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  },
                  rotate: { type: 'spring', stiffness: 400, damping: 15, delay: delay + 0.3 }
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-black ${badgeConfig.bgColor} ${badgeConfig.textColor} shadow-2xl flex items-center gap-1.5 border-2 border-white/30`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {badgeConfig.icon}
                {badgeConfig.text}
                {badgeConfig.icon}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            ) : (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: delay + 0.3 }}
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${badgeConfig.bgColor} ${badgeConfig.textColor} shadow-lg flex items-center gap-1`}
              >
                {badgeConfig.icon}
                {badgeConfig.text}
              </motion.span>
            )}
          </div>

          {/* Valores */}
          <div className="space-y-1 flex-1 flex flex-col justify-center">
            {/* Unidades - PRIMER PROTAGONISTA */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: delay + 0.2 }}
              className="flex items-baseline gap-1.5"
            >
              <div className="text-5xl font-black text-white">
                {value.toLocaleString('es-CL')}
              </div>
              <div className="text-sm text-orange-200 font-semibold">
                unidades
              </div>
            </motion.div>

            {/* Valor CLP - SEGUNDO PROTAGONISTA (mismo peso) */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: delay + 0.4 }}
            >
              <div className="text-3xl font-black text-white leading-tight">
                {formatCLP(valueCLP)}
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}
