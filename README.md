# 📊 Indicadores KPIs - Dashboard en Tiempo Real

Dashboard premium de KPIs que se conecta a Excel Online (OneDrive/SharePoint) y muestra métricas en tiempo real con actualización automática cada 5 minutos.

## ✨ Características

- 📈 **KPIs en tiempo real**: Reservas, firmas, desistimientos, días promedio
- 💳 **Forma de pago**: Visualización de contado, crédito e hipotecario
- 🏦 **Hipotecarios pendientes** y otros indicadores personalizables
- 🔄 **Actualización automática**: Cada 5 minutos (configurable)
- 🎨 **Diseño premium**: Glassmorphism, gradientes y animaciones
- 📺 **Optimizado para TV**: Ideal para mostrar en pantallas de oficina
- 🔐 **Autenticación segura**: Microsoft OAuth 2.0

## 🚀 Configuración Rápida

### 1. Instalar dependencias

```bash
cd ~/developers/indicadores-kpis
npm install
```

### 2. Configurar Azure App Registration

1. Ve a [Azure Portal - App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
2. Clic en **"New registration"**
3. Nombre: `Indicadores KPIs Dashboard`
4. Supported account types: **"Accounts in this organizational directory only"**
5. Redirect URI: Selecciona **"Single-page application (SPA)"** y agrega:
   - `http://localhost:3000`
   - `http://localhost:3000/` (con slash al final)
6. Clic en **"Register"**

### 3. Configurar permisos de API

1. En tu app recién creada, ve a **"API permissions"**
2. Clic en **"Add a permission"**
3. Selecciona **"Microsoft Graph"**
4. Selecciona **"Delegated permissions"**
5. Agrega estos permisos:
   - `Files.Read`
   - `Files.Read.All`
   - `Sites.Read.All`
6. Clic en **"Add permissions"**
7. Clic en **"Grant admin consent"** (si tienes permisos de administrador)

### 4. Obtener credenciales

En la página de tu app:
1. Ve a **"Overview"**
2. Copia el **"Application (client) ID"**
3. Copia el **"Directory (tenant) ID"**

### 5. Obtener ID del archivo de Excel

Opción A - Desde OneDrive:
1. Abre [OneDrive](https://onedrive.live.com)
2. Navega a tu archivo Excel
3. Haz clic derecho → **"Detalles"**
4. En la URL verás algo como: `id=XXXXX` - ese es tu File ID

Opción B - Usando Microsoft Graph Explorer:
1. Ve a [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
2. Inicia sesión con tu cuenta
3. Ejecuta: `GET https://graph.microsoft.com/v1.0/me/drive/root/children`
4. Busca tu archivo Excel y copia el `id`

### 6. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus valores:

```env
NEXT_PUBLIC_AZURE_CLIENT_ID=tu-client-id-aqui
NEXT_PUBLIC_AZURE_TENANT_ID=tu-tenant-id-aqui
NEXT_PUBLIC_EXCEL_FILE_ID=tu-file-id-aqui
NEXT_PUBLIC_EXCEL_SHEET_NAME=Hoja1
NEXT_PUBLIC_REFRESH_INTERVAL=300000
```

### 7. Preparar archivo Excel

Tu Excel debe tener esta estructura en la hoja especificada (ej: `Hoja1`):

| A (Métrica) | B (Valor) |
|-------------|-----------|
| Reservas del Mes | 45 |
| Firmas del Mes | 32 |
| Desistimientos del Mes | 5 |
| Dias Firmas del Mes | 7 |
| Contado | 12 |
| Credito | 15 |
| Hipotecario | 5 |
| Hipotecarios Pendientes | 8 |

**Notas importantes:**
- La columna A contiene los nombres de las métricas
- La columna B contiene los valores numéricos
- Los nombres pueden variar (el sistema normaliza automáticamente)
- Puedes agregar más métricas abajo

### 8. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📺 Configuración para TV en Oficina

### Opción 1: Modo Kiosko (Recomendado)

**Chrome en Mac:**
```bash
open -a "Google Chrome" --args --kiosk "http://localhost:3000"
```

**Chrome en Windows:**
```cmd
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk "http://localhost:3000"
```

### Opción 2: Fullscreen Manual

1. Abre el dashboard en Chrome
2. Presiona `F11` (Windows/Linux) o `Cmd+Ctrl+F` (Mac)

### Opción 3: Desplegar en producción

1. **Vercel (Gratis y Rápido):**
   ```bash
   npm i -g vercel
   vercel
   ```
   - Agrega las variables de entorno en el dashboard de Vercel
   - Actualiza la Redirect URI en Azure con tu URL de Vercel

2. **Netlify:**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

## 🎨 Personalización

### Cambiar intervalo de actualización

Edita `.env.local`:
```env
# Cada 1 minuto = 60000
# Cada 5 minutos = 300000
# Cada 10 minutos = 600000
NEXT_PUBLIC_REFRESH_INTERVAL=300000
```

### Agregar nuevos KPIs

1. Agrega la métrica en tu Excel
2. Edita `lib/excelService.ts` para incluir el nuevo campo
3. Agrega un nuevo `<KPICard>` en `app/page.tsx`

### Cambiar colores del dashboard

Edita `tailwind.config.js` para personalizar la paleta de colores.

## 🔧 Solución de Problemas

### Error: "Invalid client"
- Verifica que el `NEXT_PUBLIC_AZURE_CLIENT_ID` sea correcto
- Asegúrate de que la Redirect URI en Azure incluya `http://localhost:3000`

### Error: "Access denied"
- Verifica que los permisos de API estén correctamente configurados
- Intenta hacer "Grant admin consent" nuevamente

### Error: "File not found"
- Verifica que el `NEXT_PUBLIC_EXCEL_FILE_ID` sea correcto
- Asegúrate de que el archivo esté en tu OneDrive
- Verifica que el nombre de la hoja sea correcto

### Los datos no se actualizan
- Verifica que el Excel tenga permisos de lectura
- Revisa la consola del navegador para ver errores
- Intenta hacer logout/login nuevamente

## 📱 Estructura del Proyecto

```
indicadores-kpis/
├── app/
│   ├── page.tsx          # Página principal del dashboard
│   ├── layout.tsx        # Layout de Next.js
│   └── globals.css       # Estilos globales
├── components/
│   ├── Header.tsx        # Cabecera con última actualización
│   ├── KPICard.tsx       # Tarjeta individual de KPI
│   ├── PaymentMethodChart.tsx   # Gráfico de forma de pago
│   └── MonthlyTrendChart.tsx    # Gráfico de tendencia mensual
├── lib/
│   ├── msalConfig.ts     # Configuración de autenticación
│   └── excelService.ts   # Servicio para leer Excel
└── .env.local            # Variables de entorno (crear desde .env.local.example)
```

## 🎯 Próximas Mejoras

- [ ] Modo offline con caché de datos
- [ ] Alertas cuando métricas bajan de ciertos umbrales
- [ ] Exportar reportes en PDF
- [ ] Comparación mes a mes
- [ ] Dark mode automático según hora del día
- [ ] Soporte para múltiples hojas de Excel

## 📄 Licencia

Proyecto privado - Uso interno

---

**Desarrollado con ❤️ usando Next.js 14, TypeScript y Microsoft Graph API**
