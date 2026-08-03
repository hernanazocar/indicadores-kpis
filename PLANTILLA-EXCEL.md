# 📊 Plantilla de Excel para Indicadores KPIs

## Estructura del Archivo Excel

Tu archivo de Excel debe seguir esta estructura exacta para que el dashboard funcione correctamente.

### 📋 Nombre del Archivo
Puedes usar cualquier nombre, por ejemplo: `Indicadores-KPIs.xlsx`

### 📝 Nombre de la Hoja
Por defecto debe ser `Hoja1`, pero puedes cambiarlo en la variable de entorno `NEXT_PUBLIC_EXCEL_SHEET_NAME`

### 📐 Estructura de Columnas

| **Columna A** | **Columna B** |
|---------------|---------------|
| **Métrica**   | **Valor**     |

### ✅ Datos Obligatorios

Copia y pega esto en tu Excel (puedes cambiar los valores numéricos):

```
| A                          | B            |
|----------------------------|--------------|
| Reservas del Mes           | 45           |
| Reservas del Mes CLP       | 5625000000   |
| Firmas del Mes             | 32           |
| Firmas del Mes CLP         | 4000000000   |
| Desistimientos del Mes     | 5            |
| Desistimientos del Mes CLP | 625000000    |
| Dias Firmas del Mes        | 7            |
| Contado                    | 12           |
| Contado CLP                | 1500000000   |
| Credito                    | 15           |
| Credito CLP                | 1875000000   |
| Hipotecario                | 5            |
| Hipotecario CLP            | 625000000    |
| Hipotecarios Pendientes    | 8            |
| Hipotecarios Pendientes CLP| 1000000000   |
```

**Nota:** Los valores CLP son los montos totales en pesos chilenos para cada métrica.

### 📌 Notas Importantes

1. **La primera fila puede ser un encabezado** (será ignorada si dice "Métrica" y "Valor")

2. **Los nombres NO tienen que ser exactos**. El sistema normaliza automáticamente:
   - `Reservas del Mes` = `reservas` = `RESERVAS` = `Reservas` ✅
   - `Firmas del Mes` = `firmas` = `Firmas` ✅
   - Ignora acentos, espacios y mayúsculas

3. **Puedes agregar más métricas** después de la línea 9 si quieres

4. **Los valores deben ser números** (sin símbolos de moneda, puntos ni comas)
   - ✅ Correcto: `45`
   - ✅ Correcto: `1250000`
   - ❌ Incorrecto: `$45`
   - ❌ Incorrecto: `1.250.000`
   - ❌ Incorrecto: `45 reservas`

## 🎨 Ejemplo Visual

Así debe verse tu Excel:

![Ejemplo de Excel](https://via.placeholder.com/800x400/4f46e5/ffffff?text=Ver+imagen+de+referencia+en+README)

### Formato en Excel:

```
┌─────────────────────────────┬──────────────┐
│ A                           │ B            │
├─────────────────────────────┼──────────────┤
│ Métrica                     │ Valor        │  ← Encabezado (opcional)
├─────────────────────────────┼──────────────┤
│ Reservas del Mes            │ 45           │
│ Reservas del Mes CLP        │ 5625000000   │
│ Firmas del Mes              │ 32           │
│ Firmas del Mes CLP          │ 4000000000   │
│ Desistimientos del Mes      │ 5            │
│ Desistimientos del Mes CLP  │ 625000000    │
│ Dias Firmas del Mes         │ 7            │
│ Contado                     │ 12           │
│ Contado CLP                 │ 1500000000   │
│ Credito                     │ 15           │
│ Credito CLP                 │ 1875000000   │
│ Hipotecario                 │ 5            │
│ Hipotecario CLP             │ 625000000    │
│ Hipotecarios Pendientes     │ 8            │
│ Hipotecarios Pendientes CLP │ 1000000000   │
└─────────────────────────────┴──────────────┘
```

## 🔄 Cómo Actualizar los Datos

### Opción 1: Manualmente en Excel Online
1. Abre tu archivo en OneDrive
2. Edita los valores en la columna B
3. Los cambios se guardan automáticamente
4. El dashboard se actualizará en el próximo ciclo (cada 5 minutos por defecto)

### Opción 2: Con Fórmulas de Excel
Puedes usar fórmulas en la columna B para calcular automáticamente:

```excel
=CONTAR.SI(RangoReservas, "Completada")
=SUMA(RangoFirmas)
=PROMEDIO(RangoDias)
```

### Opción 3: Desde Power Automate / Power Query
Puedes automatizar la actualización conectando otras fuentes de datos

### Opción 4: Desde un CRM o base de datos
Si tienes un CRM (como Salesforce, HubSpot, Zoho), puedes exportar los datos a Excel

## 📊 Mapeo de Métricas

El sistema busca estos nombres (normalizado, sin importar mayúsculas/acentos/espacios):

| Nombre en Excel | Variable interna | Descripción |
|-----------------|------------------|-------------|
| Reservas del Mes | `reservasDelMes` | Total de reservas (unidades) |
| Reservas del Mes CLP | `reservasDelMesCLP` | Monto total de reservas en pesos |
| Firmas del Mes | `firmasDelMes` | Total de firmas (unidades) |
| Firmas del Mes CLP | `firmasDelMesCLP` | Monto total de firmas en pesos |
| Desistimientos del Mes | `desistimientosDelMes` | Reservas canceladas (unidades) |
| Desistimientos del Mes CLP | `desistimientosDelMesCLP` | Monto de desistimientos en pesos |
| Dias Firmas del Mes | `diasFirmasDelMes` | Promedio de días hasta firma |
| Contado | `formaPago.contado` | Pagos en contado (unidades) |
| Contado CLP | `formaPago.contadoCLP` | Monto contado en pesos |
| Credito | `formaPago.credito` | Pagos con crédito (unidades) |
| Credito CLP | `formaPago.creditoCLP` | Monto crédito en pesos |
| Hipotecario | `formaPago.hipotecario` | Pagos hipotecarios (unidades) |
| Hipotecario CLP | `formaPago.hipotecarioCLP` | Monto hipotecario en pesos |
| Hipotecarios Pendientes | `hipotecariosPendientes` | Hipotecarios en trámite (unidades) |
| Hipotecarios Pendientes CLP | `hipotecariosPendientesCLP` | Monto pendientes en pesos |

## 🎯 Consejos Pro

### 1. Usa una pestaña dedicada
Crea una hoja llamada "Dashboard" solo con los datos que el sistema necesita

### 2. Mantén los datos limpios
- Sin filas vacías entre datos
- Sin columnas adicionales a la derecha
- Sin comentarios o notas en las celdas de valores

### 3. Agrega validación de datos
En Excel, puedes agregar validación para asegurar que solo se ingresen números:
- Selecciona la columna B
- Datos → Validación de datos
- Permitir: Número entero
- Datos: mayor que 0

### 4. Protege las celdas de nombres
Bloquea la columna A para que no se modifiquen los nombres de las métricas accidentalmente

### 5. Usa formato de tabla
Convierte el rango en una Tabla de Excel (Ctrl+T):
- Se expande automáticamente al agregar filas
- Más fácil de referenciar en fórmulas
- Mejor organización visual

## ❓ Preguntas Frecuentes

### ¿Puedo agregar más métricas?
Sí, agrega más filas después de la línea 9. El dashboard mostrará los KPIs principales, pero puedes acceder a métricas adicionales modificando el código.

### ¿Puedo usar varias hojas?
Actualmente solo lee una hoja a la vez. Si quieres leer múltiples hojas, tendrás que modificar `lib/excelService.ts`.

### ¿Puedo usar SharePoint en lugar de OneDrive?
Sí, solo necesitas el File ID del archivo en SharePoint y los permisos correctos.

### ¿Qué pasa si falta una métrica?
El dashboard mostrará `0` para las métricas que no encuentre.

### ¿Puedo cambiar el orden de las métricas?
Sí, el orden en el Excel no importa. El sistema busca por nombre, no por posición.

## 🚀 Siguiente Paso

Una vez que tengas tu Excel estructurado:
1. Súbelo a OneDrive
2. Obtén el File ID (ver SETUP.md)
3. Configura las variables de entorno
4. ¡Listo! Tu dashboard estará conectado

---

**¿Necesitas ayuda?** Revisa el archivo `SETUP.md` para la guía completa de configuración.
