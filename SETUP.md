# 🚀 Guía de Configuración Paso a Paso

Esta guía te llevará de 0 a tener tu dashboard funcionando en 15 minutos.

## ⏱️ Inicio Rápido (2 minutos)

Si solo quieres ver el dashboard funcionando con datos de ejemplo:

```bash
cd ~/developers/indicadores-kpis
npm install
npm run dev
```

Abre http://localhost:3000 - verás un botón de "Demo Mode" para usar datos de prueba.

## 🔐 Configuración Completa con Excel Online

### Paso 1: Crear Azure App (5 minutos)

1. **Ir a Azure Portal**
   - Abre: https://portal.azure.com
   - Inicia sesión con tu cuenta de Microsoft

2. **Crear App Registration**
   - Busca "App registrations" en la barra de búsqueda
   - Clic en **"+ New registration"**
   
3. **Configurar la app**
   ```
   Name: Indicadores KPIs Dashboard
   Supported account types: Accounts in this organizational directory only
   Redirect URI:
     - Tipo: Single-page application (SPA)
     - URI: http://localhost:3000
   ```
   - Clic en **"Register"**

4. **Guardar credenciales**
   - En la página "Overview", copia:
     - **Application (client) ID** → Guárdalo como CLIENT_ID
     - **Directory (tenant) ID** → Guárdalo como TENANT_ID

### Paso 2: Configurar Permisos (2 minutos)

1. **Ir a API permissions** (menú lateral izquierdo)

2. **Agregar permisos**
   - Clic en **"+ Add a permission"**
   - Selecciona **"Microsoft Graph"**
   - Selecciona **"Delegated permissions"**
   - Busca y marca:
     - ☑️ Files.Read
     - ☑️ Files.Read.All
     - ☑️ Sites.Read.All
   - Clic en **"Add permissions"**

3. **Otorgar consentimiento**
   - Clic en **"✓ Grant admin consent for [tu organización]"**
   - Confirma en el popup

### Paso 3: Preparar Excel (3 minutos)

1. **Crear archivo Excel**
   - Abre Excel Online o Excel Desktop
   - Crea un nuevo archivo llamado `Indicadores-KPIs.xlsx`

2. **Agregar estructura de datos**
   
   En la **Hoja1**, copia esta estructura:

   | A | B |
   |---|---|
   | **Métrica** | **Valor** |
   | Reservas del Mes | 45 |
   | Firmas del Mes | 32 |
   | Desistimientos del Mes | 5 |
   | Dias Firmas del Mes | 7 |
   | Contado | 12 |
   | Credito | 15 |
   | Hipotecario | 5 |
   | Hipotecarios Pendientes | 8 |

   **Tips:**
   - Puedes cambiar los valores como quieras
   - Puedes agregar más métricas abajo
   - Los nombres no tienen que ser exactos (se normalizan automáticamente)

3. **Subir a OneDrive**
   - Si usas Excel Desktop: Guarda el archivo en OneDrive
   - Si usas Excel Online: Ya está en OneDrive

### Paso 4: Obtener ID del Excel (2 minutos)

**Método Fácil - Desde OneDrive:**

1. Abre https://onedrive.live.com
2. Encuentra tu archivo `Indicadores-KPIs.xlsx`
3. Haz clic derecho → **"Detalles"**
4. En el panel derecho, busca la sección de información
5. Copia el ID del archivo (es un string largo con letras y números)

**Método Alternativo - Desde la URL:**

1. Abre el archivo en OneDrive
2. Mira la URL del navegador
3. Busca el parámetro `resid=` o `id=`
4. Copia todo lo que viene después del `=` hasta el siguiente `&`

**Método Técnico - Microsoft Graph Explorer:**

1. Abre https://developer.microsoft.com/graph/graph-explorer
2. Inicia sesión
3. Ejecuta esta consulta:
   ```
   GET https://graph.microsoft.com/v1.0/me/drive/root/children
   ```
4. Busca tu archivo en la respuesta JSON
5. Copia el valor del campo `"id"`

### Paso 5: Configurar Variables de Entorno (1 minuto)

1. **Copiar archivo de ejemplo**
   ```bash
   cd ~/developers/indicadores-kpis
   cp .env.local.example .env.local
   ```

2. **Editar .env.local**
   ```bash
   nano .env.local
   # o usa tu editor favorito
   ```

3. **Pegar tus valores**
   ```env
   NEXT_PUBLIC_AZURE_CLIENT_ID=pegaAquiTuClientID
   NEXT_PUBLIC_AZURE_TENANT_ID=pegaAquiTuTenantID
   NEXT_PUBLIC_EXCEL_FILE_ID=pegaAquiTuFileID
   NEXT_PUBLIC_EXCEL_SHEET_NAME=Hoja1
   NEXT_PUBLIC_REFRESH_INTERVAL=300000
   ```

4. **Guardar y salir**
   - En nano: `Ctrl+X`, luego `Y`, luego `Enter`

### Paso 6: Ejecutar (1 minuto)

```bash
npm install
npm run dev
```

Abre http://localhost:3000

1. Verás la pantalla de login
2. Clic en **"Iniciar sesión con Microsoft"**
3. Acepta los permisos
4. ¡Listo! Verás tus KPIs en tiempo real

## 🎯 Configuración para TV en Oficina

### Opción 1: Computadora dedicada con auto-inicio

**Windows:**
1. Crea un archivo `start-dashboard.bat`:
   ```batch
   @echo off
   cd C:\Users\TuUsuario\developers\indicadores-kpis
   start cmd /k "npm start"
   timeout /t 10
   start chrome --kiosk "http://localhost:3000"
   ```
2. Agrega este archivo a Inicio automático:
   - `Win+R` → `shell:startup` → Pega el archivo .bat

**Mac:**
1. Crea un script `start-dashboard.sh`:
   ```bash
   #!/bin/bash
   cd ~/developers/indicadores-kpis
   npm start &
   sleep 10
   open -a "Google Chrome" --args --kiosk "http://localhost:3000"
   ```
2. Hazlo ejecutable: `chmod +x start-dashboard.sh`
3. Agrégalo a Login Items en System Preferences

### Opción 2: Desplegar en la nube (Gratis)

**Vercel (Recomendado):**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Durante el setup:
# - Proyecto nuevo: Yes
# - Nombre: indicadores-kpis
# - Listo!
```

**Agregar variables de entorno en Vercel:**
1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Settings → Environment Variables
4. Agrega todas las variables de `.env.local`
5. Redeploy

**Actualizar Azure Redirect URI:**
1. Ve a tu App Registration en Azure
2. Authentication → Add URI
3. Agrega: `https://tu-proyecto.vercel.app`

### Opción 3: Raspberry Pi + Monitor

```bash
# En tu Raspberry Pi
git clone <tu-repo>
cd indicadores-kpis
npm install
npm run build
npm start

# Configurar auto-inicio
sudo nano /etc/rc.local
# Agregar antes de "exit 0":
su - pi -c "cd /home/pi/indicadores-kpis && npm start &"

# Configurar Chromium en kiosk mode
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
# Agregar:
@chromium-browser --kiosk --disable-restore-session-state http://localhost:3000
```

## ❓ Troubleshooting Común

### Error: "Invalid redirect URI"
✅ **Solución:** Asegúrate de que en Azure la URI sea exactamente `http://localhost:3000` (sin slash al final) y el tipo sea "Single-page application (SPA)"

### Error: "Consent required"
✅ **Solución:** En Azure, ve a API permissions y haz clic en "Grant admin consent"

### Error: "File not found"
✅ **Solución:** 
- Verifica que el File ID sea correcto
- Asegúrate de que el archivo esté en OneDrive (no en SharePoint de otra persona)
- Verifica que el nombre de la hoja sea exactamente igual

### Error: "CORS policy blocked"
✅ **Solución:** Asegúrate de estar usando el tipo "Single-page application (SPA)" en Azure, NO "Web"

### Los datos no se muestran
✅ **Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Si ves un error de permisos, vuelve a hacer "Grant admin consent" en Azure

### El dashboard se ve mal en la TV
✅ **Solución:**
- Usa Chrome en modo kiosko (--kiosk)
- Ajusta el zoom del navegador (Ctrl + o Ctrl -)
- Verifica la resolución de la TV (recomendado: 1920x1080)

## 📞 Soporte

Si tienes problemas, revisa:
1. La consola del navegador (F12)
2. Los logs del terminal donde corre `npm run dev`
3. Verifica que todas las variables de entorno estén correctas

---

**¡Listo! Ahora tienes un dashboard profesional de KPIs en tiempo real 🎉**
