'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { motion } from 'framer-motion';

interface SecondaryMetricsChartProps {
  data: {
    diasFirmas: number;
    desistimientosPorcentaje: number;
    contadoPorcentaje: number;
    cobranza: number;
    conversion: number;
    hipotecariosDias: number;
  };
}

export default function SecondaryMetricsChart({ data }: SecondaryMetricsChartProps) {
  const chartData = [
    {
      name: 'Días Firmas',
      value: data.diasFirmas,
      fill: '#f59e0b',
      label: `${data.diasFirmas}d`,
    },
    {
      name: 'Desist. %',
      value: data.desistimientosPorcentaje,
      fill: '#ef4444',
      label: `${data.desistimientosPorcentaje}%`,
    },
    {
      name: 'Contado %',
      value: data.contadoPorcentaje,
      fill: '#10b981',
      label: `${data.contadoPorcentaje}%`,
    },
    {
      name: 'Cobranza',
      value: data.cobranza,
      fill: '#3b82f6',
      label: `${data.cobranza}`,
    },
    {
      name: 'Conversión %',
      value: data.conversion,
      fill: '#8b5cf6',
      label: `${data.conversion}%`,
    },
    {
      name: 'Hipotec. días',
      value: data.hipotecariosDias,
      fill: '#ec4899',
      label: `${data.hipotecariosDias}d`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 h-full flex flex-col"
    >
      {/* Encabezado */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xs font-bold text-slate-900">
            Métricas Operativas
          </h3>
        </div>
      </div>

      {/* Gráfico */}
      <div className="p-2 flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              style={{ fontSize: '10px', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '9px', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: '#0f172a', fontWeight: 700, fontSize: '11px' }}
              itemStyle={{ color: '#64748b', fontSize: '10px', fontWeight: 600 }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
              maxBarSize={60}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                style={{ fontSize: '10px', fontWeight: 700, fill: '#0f172a' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
