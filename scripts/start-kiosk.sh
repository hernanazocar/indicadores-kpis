#!/bin/bash

# Script para iniciar el dashboard en modo kiosko (pantalla completa para TV)
# Uso: ./scripts/start-kiosk.sh [url]
# Si no se especifica URL, usa http://localhost:3000

URL="${1:-http://localhost:3000}"

echo "🚀 Iniciando Indicadores KPIs en modo kiosko..."
echo "📺 URL: $URL"
echo ""

# Detectar sistema operativo
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "💻 Sistema: macOS"
    echo "🌐 Abriendo Chrome en modo kiosko..."
    open -a "Google Chrome" --args --kiosk "$URL" --disable-session-crashed-bubble --disable-infobars

elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "💻 Sistema: Linux"
    echo "🌐 Abriendo Chrome en modo kiosko..."
    google-chrome --kiosk "$URL" --disable-session-crashed-bubble --disable-infobars &

elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    echo "💻 Sistema: Windows"
    echo "🌐 Abriendo Chrome en modo kiosko..."
    start chrome --kiosk "$URL" --disable-session-crashed-bubble --disable-infobars

else
    echo "❌ Sistema operativo no soportado: $OSTYPE"
    exit 1
fi

echo ""
echo "✅ Dashboard abierto en modo kiosko"
echo "💡 Para salir del modo kiosko:"
echo "   - macOS: Cmd + Q"
echo "   - Linux/Windows: Alt + F4 o F11"
echo ""
