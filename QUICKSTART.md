# ⚡ QuickStart - Indicadores KPIs

## 🎯 Inicio Rápido en 2 Minutos (Modo Demo)

```bash
cd ~/developers/indicadores-kpis
npm install
npm run dev
```

Abre http://localhost:3000/demo

¡Listo! Ya puedes ver el dashboard con datos de ejemplo.

---

## 🔐 Configuración Completa con Excel Online (15 minutos)

### 1. Instalar dependencias (1 min)
```bash
npm install
```

### 2. Configurar Azure (5 min)

1. Ve a: https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
2. **New registration**
   - Name: `Indicadores KPIs`
   - Redirect URI: `Single-page application (SPA)` → `http://localhost:3000`
3. **API permissions** → Add permission → Microsoft Graph → Delegated
   - Agregar: `Files.Read`, `Files.Read.All`, `Sites.Read.All`
   - **Grant admin consent**
4. Copiar de "Overview":
   - `Application (client) ID`
   - `Directory (tenant) ID`

### 3. Preparar Excel (3 min)

Crea un archivo Excel con esta estructura:

| **A** | **B** |
|-------|-------|
| Reservas del Mes | 45 |
| Firmas del Mes | 32 |
| Desistimientos del Mes | 5 |
| Dias Firmas del Mes | 7 |
| Contado | 12 |
| Credito | 15 |
| Hipotecario | 5 |
| Hipotecarios Pendientes | 8 |

Guárdalo en OneDrive.

### 4. Obtener File ID (2 min)

**Opción A - Desde OneDrive:**
1. Abre https://onedrive.live.com
2. Clic derecho en tu archivo → **Detalles**
3. Copia el ID

**Opción B - Desde la URL:**
1. Abre el archivo en OneDrive
2. En la URL busca `id=...`
3. Copia ese valor

### 5. Configurar variables (2 min)

```bash
cp .env.local.example .env.local
nano .env.local
```

Pega tus valores:
```env
NEXT_PUBLIC_AZURE_CLIENT_ID=tu-client-id
NEXT_PUBLIC_AZURE_TENANT_ID=tu-tenant-id
NEXT_PUBLIC_EXCEL_FILE_ID=tu-file-id
NEXT_PUBLIC_EXCEL_SHEET_NAME=Hoja1
```

Guarda: `Ctrl+X` → `Y` → `Enter`

### 6. Ejecutar (1 min)

```bash
npm run dev
```

Abre http://localhost:3000

---

## 📺 Para TV en Oficina

### Opción 1: Modo Kiosko
```bash
# Mac
open -a "Google Chrome" --args --kiosk "http://localhost:3000"

# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk "http://localhost:3000"
```

### Opción 2: Desplegar en Vercel (Gratis)
```bash
npm i -g vercel
vercel
```

1. Agrega las variables de entorno en el dashboard de Vercel
2. Actualiza Redirect URI en Azure con tu URL de Vercel
3. Abre tu URL en la TV

---

## ❓ Problemas Comunes

### "Invalid redirect URI"
✅ En Azure, Redirect URI debe ser exactamente `http://localhost:3000` y tipo "SPA"

### "File not found"
✅ Verifica que el File ID sea correcto y el archivo esté en OneDrive

### "Access denied"
✅ En Azure, haz "Grant admin consent" en API permissions

### Los datos no se muestran
✅ Abre la consola del navegador (F12) y busca errores

---

## 📚 Más Información

- **README.md** - Documentación completa
- **SETUP.md** - Guía detallada paso a paso
- **PLANTILLA-EXCEL.md** - Estructura del Excel explicada

---

**¿Dudas?** Revisa la consola del navegador (F12) o los logs del terminal.
