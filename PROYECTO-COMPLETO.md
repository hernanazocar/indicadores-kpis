# 📊 Indicadores KPIs - Dashboard en Tiempo Real

## ✨ Proyecto Completo Creado

Un dashboard profesional premium que se conecta a Excel Online y muestra KPIs en tiempo real.

---

## 🎯 ¿Qué hace este proyecto?

Lee datos desde un archivo Excel en OneDrive/SharePoint y los muestra en un dashboard moderno con:

- ✅ **8 KPIs principales** con diseño premium
- ✅ **Gráficos interactivos** de barras y pie charts
- ✅ **Actualización automática** cada 5 minutos (configurable)
- ✅ **Diseño corporativo** con glassmorphism y gradientes
- ✅ **Optimizado para TV** - modo kiosko listo
- ✅ **Autenticación segura** con Microsoft OAuth 2.0

---

## 📁 Estructura del Proyecto

```
indicadores-kpis/
├── app/
│   ├── page.tsx                    # Página principal con login
│   ├── demo/page.tsx               # Modo demo con datos de prueba
│   ├── layout.tsx                  # Layout de Next.js
│   └── globals.css                 # Estilos globales + gradientes
│
├── components/
│   ├── Header.tsx                  # Cabecera con última actualización
│   ├── KPICard.tsx                 # Tarjeta individual de KPI
│   ├── PaymentMethodChart.tsx     # Gráfico de forma de pago (pie)
│   └── MonthlyTrendChart.tsx      # Gráfico de tendencia mensual (barras)
│
├── lib/
│   ├── msalConfig.ts              # Configuración de Microsoft Auth
│   ├── excelService.ts            # Servicio para leer Excel Online
│   └── mockData.ts                # Datos de ejemplo para demo
│
├── scripts/
│   ├── get-file-id.js             # Helper para obtener File ID
│   ├── test-connection.js         # Probar configuración
│   ├── start-kiosk.sh            # Iniciar en modo kiosko (Mac/Linux)
│   └── start-kiosk.bat           # Iniciar en modo kiosko (Windows)
│
├── .env.local.example             # Plantilla de variables de entorno
├── package.json                   # Dependencias del proyecto
│
└── Documentación/
    ├── README.md                  # Documentación completa
    ├── QUICKSTART.md              # Inicio rápido en 2 minutos
    ├── SETUP.md                   # Guía detallada paso a paso
    ├── PLANTILLA-EXCEL.md         # Estructura del Excel
    └── TV-SETUP.md                # Configuración para TV/Kiosko
```

---

## 🚀 Inicio Rápido

### Opción 1: Modo Demo (2 minutos)

```bash
cd ~/developers/indicadores-kpis
npm install
npm run dev
```

Abre: http://localhost:3000/demo

### Opción 2: Con Excel Real (15 minutos)

Ver: `QUICKSTART.md`

---

## 📊 KPIs que se Muestran

### Tarjetas Principales (8 KPIs)
1. **Reservas del Mes** 🎯
2. **Firmas del Mes** ✍️
3. **Desistimientos del Mes** ⚠️
4. **Días Firmas del Mes** 📅
5. **Contado** 💵
6. **Crédito** 💳
7. **Hipotecario** (en forma de pago)
8. **Hipotecarios Pendientes** 🏦

### Gráficos
- **Gráfico de Barras**: Reservas vs Firmas vs Desistimientos
- **Gráfico Pie**: Forma de Pago (Contado/Crédito/Hipotecario)

---

## 🎨 Características de Diseño

### Premium UI/UX
- Glassmorphism (fondo translúcido con blur)
- Gradientes personalizados por KPI
- Animaciones suaves con Framer Motion
- Iconos emoji para cada métrica
- Efectos hover y glow

### Dark Mode Ready
- Soporte automático para tema oscuro
- Colores optimizados para ambos modos

### Responsive
- Funciona en desktop, tablet y móvil
- Optimizado para pantallas grandes (TV)

---

## 🔧 Tecnologías Utilizadas

- **Framework**: Next.js 14 (React)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Gráficos**: Recharts
- **Animaciones**: Framer Motion
- **Autenticación**: MSAL (Microsoft Authentication Library)
- **API**: Microsoft Graph API
- **Fecha**: date-fns

---

## ⚙️ Variables de Entorno

Copia `.env.local.example` a `.env.local` y configura:

```env
# Azure App Registration
NEXT_PUBLIC_AZURE_CLIENT_ID=         # Client ID de Azure
NEXT_PUBLIC_AZURE_TENANT_ID=         # Tenant ID de Azure

# Excel Online
NEXT_PUBLIC_EXCEL_FILE_ID=           # ID del archivo Excel
NEXT_PUBLIC_EXCEL_SHEET_NAME=Hoja1   # Nombre de la hoja

# Configuración
NEXT_PUBLIC_REFRESH_INTERVAL=300000  # 5 minutos en ms
```

---

## 📋 Estructura del Excel

Tu Excel debe tener esta estructura en la hoja especificada:

| **A (Métrica)** | **B (Valor)** |
|-----------------|---------------|
| Reservas del Mes | 45 |
| Firmas del Mes | 32 |
| Desistimientos del Mes | 5 |
| Dias Firmas del Mes | 7 |
| Contado | 12 |
| Credito | 15 |
| Hipotecario | 5 |
| Hipotecarios Pendientes | 8 |

Ver: `PLANTILLA-EXCEL.md` para detalles completos

---

## 📺 Configuración para TV

### Modo Kiosko Rápido

**Mac:**
```bash
./scripts/start-kiosk.sh
```

**Windows:**
```cmd
scripts\start-kiosk.bat
```

**Linux:**
```bash
./scripts/start-kiosk.sh
```

Ver: `TV-SETUP.md` para configuración completa 24/7

---

## 🌐 Despliegue en Producción

### Vercel (Gratis y Recomendado)

```bash
npm i -g vercel
vercel
```

1. Agrega las variables de entorno en Vercel Dashboard
2. Actualiza Redirect URI en Azure
3. ¡Listo! URL: `https://tu-proyecto.vercel.app`

### Otras opciones
- Netlify
- Railway
- Render
- Azure Static Web Apps

---

## 🔐 Seguridad

- ✅ Autenticación OAuth 2.0 con Microsoft
- ✅ Tokens seguros con MSAL
- ✅ Sin contraseñas en el código
- ✅ Variables de entorno para credenciales
- ✅ Permisos de solo lectura en Excel
- ✅ HTTPS en producción (Vercel)

---

## 📱 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo

# Producción
npm run build           # Compilar para producción
npm start               # Iniciar servidor de producción

# Utilidades
npm run lint            # Verificar código
node scripts/get-file-id.js "archivo.xlsx"  # Obtener File ID
node scripts/test-connection.js             # Probar conexión
```

---

## 🆘 Soporte

### Documentación
- `README.md` - Documentación completa
- `QUICKSTART.md` - Inicio rápido
- `SETUP.md` - Configuración detallada
- `PLANTILLA-EXCEL.md` - Estructura de datos
- `TV-SETUP.md` - Configuración para TV

### Troubleshooting
Ver la sección "Problemas Comunes" en cada documento

### Logs
- Consola del navegador (F12)
- Terminal donde corre `npm run dev`
- Logs de systemd (si usas Raspberry Pi)

---

## 🎯 Próximos Pasos

1. ✅ Instalar dependencias: `npm install`
2. ✅ Probar modo demo: `npm run dev` → http://localhost:3000/demo
3. ✅ Configurar Azure App (ver SETUP.md)
4. ✅ Preparar Excel (ver PLANTILLA-EXCEL.md)
5. ✅ Configurar variables de entorno
6. ✅ Ejecutar con datos reales
7. ✅ Configurar para TV (ver TV-SETUP.md)
8. ✅ Desplegar en producción (opcional)

---

## 📊 Personalización

### Agregar nuevos KPIs

1. Agrega la métrica en tu Excel
2. Edita `lib/excelService.ts` para leerla
3. Agrega un `<KPICard>` en `app/page.tsx`

### Cambiar colores

Edita `tailwind.config.js` o los gradientes en los componentes

### Cambiar intervalo de actualización

En `.env.local`:
```env
# Cada 1 minuto = 60000
# Cada 5 minutos = 300000 (default)
# Cada 10 minutos = 600000
NEXT_PUBLIC_REFRESH_INTERVAL=300000
```

---

## 📄 Licencia

Proyecto privado - Uso interno

---

## 👨‍💻 Desarrollado con

- ❤️ Next.js 14
- 🎨 Tailwind CSS
- 📊 Recharts
- 🔐 Microsoft Graph API
- ⚡ Framer Motion

---

**¡Dashboard de KPIs listo para usar! 🎉**

Para empezar: `npm install && npm run dev`
