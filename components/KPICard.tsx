'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface KPICardProps {
  title: string;
  value: number | string;
  valueCLP?: number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'primary' | 'success' | 'info' | 'neutral' | 'meta' | 'danger' | 'warning';
  delay?: number;
  metaValue?: number;
  metaValueCLP?: number;
  reverseGap?: boolean; // Para desistimientos donde menor es mejor
  showPercentage?: boolean; // Para mostrar como porcentaje
  additionalInfo?: string; // Info adicional debajo del gap
  progressBasedOnCLP?: boolean; // Si true, % cumplimiento sobre CLP; si false, sobre unidades
}

export default function KPICard({
  title,
  value,
  valueCLP,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = 'neutral',
  delay = 0,
  metaValue,
  metaValueCLP,
  reverseGap = false,
  showPercentage = false,
  additionalInfo,
  progressBasedOnCLP = false,
}: KPICardProps) {
  const variants = {
    primary: {
      bgColor: 'bg-white',
      borderColor: '',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      valueColor: 'text-slate-900',
      titleColor: 'text-blue-600',
      clpColor: 'text-gray-600',
      subtitleColor: 'text-gray-500',
      progressBg: 'bg-blue-500',
    },
    success: {
      bgColor: 'bg-white',
      borderColor: '',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      valueColor: 'text-slate-900',
      titleColor: 'text-emerald-600',
      clpColor: 'text-gray-600',
      subtitleColor: 'text-gray-500',
      progressBg: 'bg-emerald-500',
    },
    danger: {
      bgColor: 'bg-white',
      borderColor: '',
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-600',
      valueColor: 'text-slate-900',
      titleColor: 'text-red-600',
      clpColor: 'text-gray-600',
      subtitleColor: 'text-gray-500',
      progressBg: 'bg-red-500',
    },
    info: {
      bgColor: 'bg-white',
      borderColor: 'border-l-8 border-emerald-500',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      valueColor: 'text-slate-900',
      titleColor: 'text-slate-600',
      clpColor: 'text-slate-700',
      subtitleColor: 'text-slate-500',
      progressBg: 'bg-emerald-500',
    },
    neutral: {
      bgColor: 'bg-white',
      borderColor: 'border-l-8 border-emerald-500',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      valueColor: 'text-slate-900',
      titleColor: 'text-slate-600',
      clpColor: 'text-slate-700',
      subtitleColor: 'text-slate-500',
      progressBg: 'bg-emerald-500',
    },
    meta: {
      bgColor: 'bg-white',
      borderColor: 'border-l-8 border-slate-700',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-700',
      valueColor: 'text-slate-900',
      titleColor: 'text-slate-600',
      clpColor: 'text-slate-700',
      subtitleColor: 'text-slate-500',
      progressBg: 'bg-slate-700',
    },
    warning: {
      bgColor: 'bg-white',
      borderColor: 'border-l-8 border-amber-500',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      valueColor: 'text-slate-900',
      titleColor: 'text-slate-600',
      clpColor: 'text-slate-700',
      subtitleColor: 'text-slate-500',
      progressBg: 'bg-amber-500',
    },
  };

  const colors = variants[variant];

  const trendColors = {
    up: 'text-emerald-900 bg-white/90',
    down: 'text-red-700 bg-white/90',
    neutral: 'text-slate-700 bg-white/90',
  };

  const trendIcons = {
    up: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    neutral: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    ),
  };

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calcular gap (diferencia con la meta)
  const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;
  let gapUnits = metaValue ? metaValue - numValue : null;
  let gapCLP = metaValueCLP && valueCLP ? metaValueCLP - valueCLP : null;

  // Si reverseGap es true (desistimientos), invertir la lógica
  if (reverseGap && gapUnits !== null && metaValue !== undefined) {
    gapUnits = numValue - metaValue; // Ahora positivo es malo, negativo es bueno
  }
  if (reverseGap && gapCLP !== null && metaValueCLP !== undefined) {
    gapCLP = (valueCLP || 0) - metaValueCLP;
  }

  // Calcular porcentaje de progreso (según configuración)
  const progressPercent = progressBasedOnCLP && metaValueCLP && valueCLP
    ? Math.min(Math.round((valueCLP / metaValueCLP) * 100), 100)
    : metaValue
      ? Math.min(Math.round((numValue / metaValue) * 100), 100)
      : 0;

  // Determinar color del gap según rendimiento
  const getGapColor = () => {
    if (variant === 'meta') return '';
    if (gapUnits === null || metaValue === undefined) return 'text-slate-600';

    if (reverseGap) {
      // Para desistimientos, negativo es bueno
      if (gapUnits <= 0) return 'text-emerald-600 font-bold'; // Cumple o supera
      if (gapUnits <= metaValue * 0.1) return 'text-amber-600 font-bold'; // Cerca
      return 'text-red-600 font-bold'; // Muy por encima
    } else {
      // Para otros KPIs, positivo gap significa que falta
      if (gapUnits <= 0) return 'text-emerald-600 font-bold'; // Cumple o supera
      if (gapUnits <= metaValue * 0.2) return 'text-amber-600 font-bold'; // Cerca (falta <20%)
      return 'text-red-600 font-bold'; // Lejos (falta >20%)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="group h-full"
    >
      <div className={`relative ${colors.bgColor} ${colors.borderColor} rounded-lg overflow-hidden transition-all duration-300 h-full hover:shadow-2xl shadow-lg`}>
        <div className="p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              {icon && (
                <div className={`p-0.5 rounded-lg ${colors.iconBg} flex-shrink-0`}>
                  <div className={colors.iconColor}>
                    {icon}
                  </div>
                </div>
              )}
              <p className={`text-[10px] font-bold ${colors.titleColor} uppercase tracking-wide`}>
                {title}
              </p>
            </div>
            {metaValue && progressPercent !== undefined && (
              <div className="flex items-center gap-1">
                {progressPercent >= 100 ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15, delay: delay + 0.3 }}
                    className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    META {progressPercent}%
                  </motion.span>
                ) : (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    progressPercent >= 90 ? 'bg-emerald-100 text-emerald-700' :
                    progressPercent >= 70 ? 'bg-blue-100 text-blue-700' :
                    progressPercent >= 50 ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {progressPercent}%
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-0.5">
            {/* Valor en unidades - PRIMER PROTAGONISTA */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
              className="flex items-baseline gap-1"
            >
              <div className={`text-3xl font-black ${colors.valueColor}`}>
                {typeof value === 'number' ? value.toLocaleString('es-CL') : value}{showPercentage ? '%' : ''}
              </div>
              {!showPercentage && (
                <div className={`text-xs font-semibold ${colors.subtitleColor}`}>
                  {subtitle || 'unidades'}
                </div>
              )}
            </motion.div>

            {/* Valor en CLP - SEGUNDO PROTAGONISTA (mismo peso) */}
            {valueCLP !== undefined && valueCLP > 0 && (
              <div className={`text-2xl font-black ${colors.valueColor} leading-tight`}>
                {formatCLP(valueCLP)}
              </div>
            )}

            {/* Meta debajo del valor */}
            {metaValue && variant !== 'meta' && (
              <div className={`text-[9px] font-semibold ${colors.subtitleColor} mt-0.5`}>
                Meta: {metaValue.toLocaleString('es-CL')} {showPercentage ? '%' : 'unid.'} ({progressPercent}% cumpl.)
              </div>
            )}

            {/* Barra de Progreso */}
            {metaValue && variant !== 'meta' && (
              <div className="mt-0.5">
                <div className="bg-slate-100 h-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, delay: delay + 0.3 }}
                    className={`h-full rounded-full ${colors.progressBg}`}
                  />
                </div>
              </div>
            )}

            {/* Gap vs Meta */}
            {gapUnits !== null && variant !== 'meta' && (
              <div className="mt-0.5 pt-0.5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-0">
                  <span className={`text-[8px] font-semibold ${colors.subtitleColor}`}>
                    Gap vs Meta:
                  </span>
                </div>
                <div className={`text-[10px] font-bold ${getGapColor()}`}>
                  {gapUnits > 0 ? '-' : '+'}{Math.abs(gapUnits).toLocaleString('es-CL')}{showPercentage ? '%' : ' unid.'}
                </div>
                {gapCLP !== null && gapCLP !== 0 && (
                  <div className={`text-[8px] font-semibold ${colors.subtitleColor} mt-0`}>
                    {gapCLP > 0 ? '-' : '+'}{formatCLP(Math.abs(gapCLP))}
                  </div>
                )}
              </div>
            )}

            {/* Additional Info */}
            {additionalInfo && !metaValue && (
              <div className={`text-[8px] font-semibold ${colors.subtitleColor} mt-0.5 leading-snug whitespace-pre-line`}>
                {additionalInfo}
              </div>
            )}

            {trend && trendValue && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${trendColors[trend]} w-fit shadow-sm mt-2`}>
                {trendIcons[trend]}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
