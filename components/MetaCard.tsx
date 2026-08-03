'use client';

import { motion } from 'framer-motion';

interface MetaCardProps {
  value: number;
  valueCLP: number;
  delay?: number;
}

export default function MetaCard({ value, valueCLP, delay = 0 }: MetaCardProps) {
  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="group"
    >
      <div className="relative bg-slate-800 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl border-l-8 border-white h-full">
        <div className="relative p-3 h-full flex flex-col">
          {/* Icono y título */}
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-white/10 flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Meta del Mes
            </p>
          </div>

          {/* Valores */}
          <div className="space-y-1 flex-1 flex flex-col justify-center">
            {/* Unidades */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: delay + 0.2 }}
            >
              <div className="text-4xl font-black text-white mb-1">
                {value.toLocaleString('es-CL')}
              </div>
              <div className="text-xs text-orange-200">
                unidades
              </div>
            </motion.div>

            {/* Valor CLP */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: delay + 0.4 }}
            >
              <div className="text-lg font-bold text-white mt-2">
                {formatCLP(valueCLP)}
              </div>
            </motion.div>

            {/* Info adicional */}
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="text-xs text-orange-200">Objetivo Anual</div>
              <div className="text-sm font-bold text-white">600 unidades</div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
