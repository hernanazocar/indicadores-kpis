# 📊 Estructura del Archivo Excel

## 🎯 Ubicación del Archivo

Tu archivo Excel debe estar en **OneDrive** o **SharePoint** para que el dashboard pueda leerlo.

## 📋 Estructura Requerida

El archivo debe tener la siguiente estructura exacta en la hoja especificada (por defecto "Hoja1"):

### Formato de Columnas

| Columna A (Métrica) | Columna B (Valor Unidades) | Columna C (Valor CLP) |
|---------------------|----------------------------|------------------------|
| Meta del Mes | 50 | 10000000000 |
| Reservas del Mes | 45 | 9000000000 |
| Firmas del Mes | 32 | 6400000000 |
| Desistimientos del Mes | 5 | 1000000000 |
| Dias Firmas del Mes | 7 | 0 |
| Contado | 12 | 2400000000 |
| Credito | 15 | 3000000000 |
| Hipotecario | 5 | 1000000000 |
| Hipotecarios Pendientes | 8 | 1600000000 |

## 📝 Detalles Importantes

### Nombres de Métricas (Columna A)

Los nombres pueden tener variaciones, el sistema los normaliza automáticamente:

- **Meta del Mes** → También acepta: "Meta", "meta del mes", "META DEL MES"
- **Reservas del Mes** → También acepta: "Reservas", "reservas del mes"
- **Firmas del Mes** → También acepta: "Firmas", "firmas del mes"
- **Desistimientos del Mes** → También acepta: "Desistimientos", "desistimientos"
- **Dias Firmas del Mes** → También acepta: "Dias Firmas", "días firmas"
- **Contado** → Debe ser exactamente "Contado" o "contado"
- **Credito** → También acepta: "Crédito" (con o sin tilde)
- **Hipotecario** → Forma de pago hipotecaria
- **Hipotecarios Pendientes** → También acepta: "Pendientes", "hipotecarios pendientes"

### Valores (Columna B y C)

- **Columna B**: Número de unidades (entero)
- **Columna C**: Valor en pesos chilenos (CLP) - sin puntos ni comas, solo números

### ⚠️ Importante

1. **No incluir la fila de encabezados** - Empieza directamente con los datos en la fila 1
2. **No dejar celdas vacías** - Si no tienes un valor, pon 0
3. **No usar formato de moneda en Excel** - Solo números sin símbolos
4. **Los valores CLP deben ser números completos** - Ejemplo: 10000000000 (no "10.000.000.000")

## 📊 Ejemplo Visual

```
A1: Meta del Mes              B1: 50    C1: 10000000000
A2: Reservas del Mes          B2: 45    C2: 9000000000
A3: Firmas del Mes            B3: 32    C3: 6400000000
A4: Desistimientos del Mes    B4: 5     C4: 1000000000
A5: Dias Firmas del Mes       B5: 7     C5: 0
A6: Contado                   B6: 12    C6: 2400000000
A7: Credito                   B7: 15    C7: 3000000000
A8: Hipotecario               B8: 5     C8: 1000000000
A9: Hipotecarios Pendientes   B9: 8     C9: 1600000000
```

## 🔧 Configuración del Dashboard

Una vez que tengas tu Excel listo:

1. Súbelo a tu **OneDrive** o **SharePoint**
2. Obtén el **File ID** del archivo
3. Configura las variables de entorno en `.env.local`
4. El dashboard leerá automáticamente este archivo cada 5 minutos

## 📌 Notas

- Puedes agregar más filas debajo con otras métricas personalizadas
- El sistema lee las primeras 20 filas (puedes ajustar en `excelService.ts`)
- Los valores se actualizan automáticamente cada 5 minutos (configurable)
- No necesitas cerrar el Excel mientras el dashboard lo lee
