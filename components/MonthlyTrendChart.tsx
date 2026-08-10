'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

interface MonthlyTrendChartProps {
  data: {
    reservasDelMes: number;
    firmasDelMes: number;
    desistimientosDelMes: number;
  };
  meta?: number;
}

export default function MonthlyTrendChart({ data, meta = 50 }: MonthlyTrendChartProps) {
  // Calcular porcentaje de avance vs meta
  const porcentajeReservas = Math.round((data.reservasDelMes / meta) * 100);
  const porcentajeFirmas = Math.round((data.firmasDelMes / meta) * 100);
  const porcentajeDesistimientos = Math.round((data.desistimientosDelMes / meta) * 100);

  const chartData = [
    {
      name: 'Meta',
      actual: meta,
      meta: meta,
      fill: '#94a3b8',
      label: `${meta}`,
    },
    {
      name: 'Reservas',
      actual: data.reservasDelMes,
      meta: meta,
      fill: '#3b82f6',
      label: `${data.reservasDelMes} (${porcentajeReservas}%)`,
    },
    {
      name: 'Firmas',
      actual: data.firmasDelMes,
      meta: meta,
      fill: '#10b981',
      label: `${data.firmasDelMes} (${porcentajeFirmas}%)`,
    },
    {
      name: 'Desistimientos',
      actual: data.desistimientosDelMes,
      meta: meta,
      fill: '#ef4444',
      label: `${data.desistimientosDelMes} (${porcentajeDesistimientos}%)`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
    >
      {/* Encabezado */}
      <div className="bg-slate-50 border-b border-slate-200 p-1.5">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-[10px] font-bold text-slate-900">
            Resumen del Mes
          </h3>
        </div>
      </div>

      {/* Gráfico */}
      <div className="p-1">
        <ResponsiveContainer width="100%" height={140}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              style={{ fontSize: '12px', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '11px', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              domain={[0, meta * 1.2]}
            />
            <ReferenceLine
              y={meta}
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: `Meta: ${meta}`,
                position: 'right',
                fill: '#ef4444',
                fontSize: 11,
                fontWeight: 700
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: '#0f172a', fontWeight: 700, fontSize: '12px' }}
              itemStyle={{ color: '#64748b', fontSize: '11px', fontWeight: 600 }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
            />
            <Bar
              dataKey="actual"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
              maxBarSize={100}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                style={{ fontSize: '11px', fontWeight: 700, fill: '#0f172a' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
