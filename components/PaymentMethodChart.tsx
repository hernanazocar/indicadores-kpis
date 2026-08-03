'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface PaymentMethodChartProps {
  data: {
    contado: number;
    credito: number;
    hipotecario: number;
  };
}

export default function PaymentMethodChart({ data }: PaymentMethodChartProps) {
  const total = data.contado + data.credito + data.hipotecario;

  const chartData = [
    {
      name: 'Contado',
      value: data.contado,
      percent: total > 0 ? Math.round((data.contado / total) * 100) : 0
    },
    {
      name: 'Facilidad de Pago',
      value: data.credito,
      percent: total > 0 ? Math.round((data.credito / total) * 100) : 0
    },
    {
      name: 'Crédito Hipotecario',
      value: data.hipotecario,
      percent: total > 0 ? Math.round((data.hipotecario / total) * 100) : 0
    },
  ];

  // Paleta de colores profesional
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const entry = chartData[index];
    if (entry.percent < 5) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-bold drop-shadow-lg"
      >
        {`${entry.percent}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
    >
      {/* Encabezado */}
      <div className="bg-slate-50 border-b border-slate-200 p-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Distribución de Pagos
          </h3>
        </div>
      </div>

      {/* Gráfico */}
      <div className="p-2">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
              strokeWidth={3}
              stroke="#ffffff"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-black fill-slate-900"
            >
              {total}
            </text>
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-semibold fill-slate-600"
            >
              Total Ventas
            </text>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: '#0f172a', fontWeight: 700, marginBottom: '4px' }}
              itemStyle={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
