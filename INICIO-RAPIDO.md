# 🚀 Inicio Rápido - Dashboard KPIs

## ⚡ 2 Formas de Empezar

### 🎨 Opción 1: Ver el Diseño (1 minuto)

Si solo quieres ver cómo se ve el dashboard con datos de ejemplo:

```bash
cd ~/developers/indicadores-kpis
npm run dev
```

Abre: [http://localhost:3000/demo](http://localhost:3000/demo)

✅ **Verás el dashboard completo con datos de prueba**

---

### 🔗 Opción 2: Conectar con Excel Real (20 minutos)

Para que el dashboard lea datos reales de tu Excel en OneDrive:

#### Paso 1: Configurar Azure (15 min)

Lee la guía paso a paso: **`GUIA-CONFIGURACION-AZURE.md`**

Resumen rápido:
1. Crea App Registration en [Azure Portal](https://portal.azure.com)
2. Configura permisos: Files.Read, Files.Read.All, Sites.Read.All
3. Copia Client ID y Tenant ID

#### Paso 2: Preparar Excel (3 min)

Lee la estructura exacta: **`ESTRUCTURA-EXCEL.md`**

Tu Excel debe tener 3 columnas:

| A (Métrica) | B (Unidades) | C (CLP) |
|-------------|--------------|---------|
| Meta del Mes | 50 | 10000000000 |
| Reservas del Mes | 45 | 9000000000 |
| ... | ... | ... |

1. Créalo con esa estructura
2. Súbelo a OneDrive
3. Obtén el File ID usando [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer)

#### Paso 3: Configurar Variables (2 min)

Edita `.env.local` y completa:

```env
NEXT_PUBLIC_AZURE_CLIENT_ID=tu-client-id
NEXT_PUBLIC_AZURE_TENANT_ID=tu-tenant-id
NEXT_PUBLIC_EXCEL_FILE_ID=tu-file-id
NEXT_PUBLIC_EXCEL_SHEET_NAME=Hoja1
NEXT_PUBLIC_REFRESH_INTERVAL=300000
```

#### Paso 4: Ejecutar

```bash
npm run dev
```

Abre: [http://localhost:3000](http://localhost:3000)

Haz login con Microsoft y verás tus datos reales.

---

## 📚 Documentación Disponible

- **`RESUMEN-PROYECTO.md`** - Resumen completo del proyecto y estado actual
- **`GUIA-CONFIGURACION-AZURE.md`** - Tutorial paso a paso para Azure
- **`ESTRUCTURA-EXCEL.md`** - Formato exacto del archivo Excel
- **`README.md`** - Documentación general completa
- **`TV-SETUP.md`** - Configuración para pantallas 24/7

---

## 🎨 Diseño Completado

✅ Paleta de colores premium (Azul, Verde, Cyan, Púrpura, Gris)
✅ 8 KPIs con valores en unidades y CLP
✅ 2 gráficos interactivos (Barras y Pie)
✅ Animaciones suaves
✅ Actualización automática cada 5 minutos
✅ Diseño responsivo

---

## ❓ ¿Problemas?

1. **No carga el dashboard**: Verifica que `npm run dev` esté corriendo
2. **Error de login**: Revisa Client ID y Tenant ID en `.env.local`
3. **No encuentra el Excel**: Verifica el File ID en Graph Explorer
4. **Datos no aparecen**: Revisa que tu Excel tenga la estructura correcta

Ver más en: **`GUIA-CONFIGURACION-AZURE.md`** (sección Solución de Problemas)

---

## 🎯 Próximos Pasos

1. ✅ Ver diseño en `/demo`
2. ⏳ Configurar Azure
3. ⏳ Conectar Excel
4. ⏳ Desplegar a producción (Vercel)
5. ⏳ Configurar para TV

---

**¡Listo para usar! 🎉**
