# 🔐 Guía Completa de Configuración Azure

Esta guía te llevará paso a paso para configurar la autenticación con Microsoft y conectar tu Excel.

## 📋 Requisitos Previos

- Cuenta de Microsoft (Office 365, Outlook, Hotmail, etc.)
- Archivo Excel en OneDrive o SharePoint
- Acceso a Azure Portal

---

## 1️⃣ Crear Azure App Registration

### Paso 1: Acceder a Azure Portal

1. Ve a [Azure Portal - App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
2. Inicia sesión con tu cuenta de Microsoft
3. Haz clic en **"+ New registration"** (Nueva registro)

### Paso 2: Configurar la Aplicación

Completa el formulario con los siguientes datos:

- **Name** (Nombre): `Dashboard KPIs` (o el nombre que prefieras)
- **Supported account types**: Selecciona **"Accounts in this organizational directory only"**
- **Redirect URI**:
  - Tipo: **Single-page application (SPA)**
  - URL: `http://localhost:3000`

4. Haz clic en **"Register"**

### Paso 3: Copiar IDs Importantes

Una vez creada la app, verás la página de **Overview**:

1. Copia el **Application (client) ID**
   - Ejemplo: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`
   - Este será tu `NEXT_PUBLIC_AZURE_CLIENT_ID`

2. Copia el **Directory (tenant) ID**
   - Ejemplo: `x1y2z3a4-b5c6-d7e8-f9g0-h1i2j3k4l5m6`
   - Este será tu `NEXT_PUBLIC_AZURE_TENANT_ID`

---

## 2️⃣ Configurar Permisos de API

### Paso 1: Ir a API Permissions

1. En el menú lateral izquierdo, haz clic en **"API permissions"**
2. Haz clic en **"+ Add a permission"**

### Paso 2: Agregar Permisos de Microsoft Graph

1. Selecciona **"Microsoft Graph"**
2. Selecciona **"Delegated permissions"**
3. Busca y selecciona los siguientes permisos:
   - ✅ **Files.Read**
   - ✅ **Files.Read.All**
   - ✅ **Sites.Read.All**
4. Haz clic en **"Add permissions"**

### Paso 3: Otorgar Consentimiento de Administrador

1. Haz clic en **"Grant admin consent for [tu organización]"**
2. Confirma haciendo clic en **"Yes"**
3. Verás checkmarks verdes ✅ en todos los permisos

---

## 3️⃣ Configurar Redirect URIs

### Desarrollo (Local)

1. Ve a **"Authentication"** en el menú lateral
2. En **"Single-page application"**, verifica que esté:
   - ✅ `http://localhost:3000`
   - ✅ `http://localhost:3000/` (con slash al final)

### Producción (Cuando Despliegues)

Cuando subas el dashboard a producción (Vercel, Netlify, etc.):

1. Ve a **"Authentication"**
2. Agrega tu URL de producción:
   - Ejemplo: `https://tu-dashboard.vercel.app`
   - Ejemplo: `https://tu-dashboard.netlify.app`

---

## 4️⃣ Obtener File ID del Excel

Tienes 3 opciones para obtener el ID de tu archivo:

### Opción A: Graph Explorer (Recomendado)

1. Ve a [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
2. Inicia sesión con tu cuenta de Microsoft
3. En la barra superior, ejecuta esta consulta:
   ```
   GET https://graph.microsoft.com/v1.0/me/drive/root/children
   ```
4. Haz clic en **"Run query"**
5. Busca tu archivo Excel en la respuesta JSON
6. Copia el valor del campo `"id"`
   - Ejemplo: `01ABCDEFGHIJKLMNOPQRSTUVWXYZ123456!789`

### Opción B: Desde OneDrive Web

1. Abre [OneDrive](https://onedrive.live.com)
2. Navega hasta tu archivo Excel
3. Haz clic derecho → **"Details"** (Detalles)
4. En la URL verás algo como: `...&id=XXXXX`
5. Copia ese ID

### Opción C: Script Automático

Ejecuta el script incluido en el proyecto:

```bash
cd ~/developers/indicadores-kpis
node scripts/get-file-id.js "NombreDelArchivo.xlsx"
```

---

## 5️⃣ Configurar Variables de Entorno

1. Abre el archivo `.env.local` en el proyecto
2. Completa con tus valores:

```env
NEXT_PUBLIC_AZURE_CLIENT_ID=a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
NEXT_PUBLIC_AZURE_TENANT_ID=x1y2z3a4-b5c6-d7e8-f9g0-h1i2j3k4l5m6
NEXT_PUBLIC_EXCEL_FILE_ID=01ABCDEFGHIJKLMNOPQRSTUVWXYZ123456!789
NEXT_PUBLIC_EXCEL_SHEET_NAME=Hoja1
NEXT_PUBLIC_REFRESH_INTERVAL=300000
```

---

## 6️⃣ Probar la Conexión

### Ejecutar el Dashboard

```bash
cd ~/developers/indicadores-kpis
npm run dev
```

### Verificar Funcionamiento

1. Abre [http://localhost:3000](http://localhost:3000)
2. Haz clic en **"Iniciar sesión con Microsoft"**
3. Acepta los permisos solicitados
4. Deberías ver tu dashboard con los datos del Excel

---

## 🔧 Solución de Problemas

### Error: "Invalid client"

**Causa**: El `NEXT_PUBLIC_AZURE_CLIENT_ID` es incorrecto

**Solución**:
- Verifica que copiaste correctamente el Application (client) ID
- No debe tener espacios ni caracteres extra

### Error: "AADSTS50011: Redirect URI mismatch"

**Causa**: La Redirect URI no está configurada correctamente

**Solución**:
- Ve a Azure Portal → Tu App → Authentication
- Asegúrate de agregar `http://localhost:3000` como SPA
- Verifica que no haya espacios ni caracteres extra

### Error: "Access denied" o "Insufficient permissions"

**Causa**: Los permisos de API no están configurados o no se otorgó consentimiento

**Solución**:
- Ve a Azure Portal → Tu App → API permissions
- Verifica que estén: Files.Read, Files.Read.All, Sites.Read.All
- Haz clic en "Grant admin consent"

### Error: "File not found" o "Item not found"

**Causa**: El `NEXT_PUBLIC_EXCEL_FILE_ID` es incorrecto o el archivo no existe

**Solución**:
- Verifica que el archivo Excel esté en tu OneDrive
- Obtén nuevamente el File ID usando Graph Explorer
- Verifica que el nombre de la hoja sea correcto

### Los datos no se actualizan

**Causa**: El archivo Excel no tiene los permisos correctos o está corrupto

**Solución**:
- Abre la consola del navegador (F12)
- Revisa si hay errores en la pestaña "Console"
- Verifica que el Excel tenga la estructura correcta (ver ESTRUCTURA-EXCEL.md)
- Intenta hacer logout y login nuevamente

---

## 📝 Checklist de Configuración

Usa esta lista para verificar que todo está configurado:

- [ ] App Registration creada en Azure Portal
- [ ] Application (client) ID copiado
- [ ] Directory (tenant) ID copiado
- [ ] Permisos de API agregados (Files.Read, Files.Read.All, Sites.Read.All)
- [ ] Consentimiento de administrador otorgado
- [ ] Redirect URI configurada (`http://localhost:3000`)
- [ ] Excel subido a OneDrive
- [ ] File ID del Excel obtenido
- [ ] Excel con estructura correcta (ver ESTRUCTURA-EXCEL.md)
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Proyecto ejecutándose con `npm run dev`
- [ ] Login exitoso con Microsoft
- [ ] Datos del Excel mostrándose en el dashboard

---

## 🎯 Próximos Pasos

Una vez que todo funcione localmente:

1. **Desplegar en producción** (Vercel, Netlify, etc.)
2. **Actualizar Redirect URIs** en Azure con la URL de producción
3. **Configurar variables de entorno** en el servicio de hosting
4. **Configurar para TV** en modo kiosko (ver TV-SETUP.md)

---

## 💡 Consejos

- **Seguridad**: Nunca compartas tus Client ID, Tenant ID o File ID públicamente
- **Permisos**: Solo otorga los permisos mínimos necesarios
- **Testing**: Prueba primero en local antes de desplegar a producción
- **Backup**: Guarda una copia de tu configuración de Azure
- **Documentación**: Mantén este documento actualizado si cambias algo

---

**¿Necesitas ayuda?** Revisa los logs en la consola del navegador (F12) para más detalles sobre errores.
