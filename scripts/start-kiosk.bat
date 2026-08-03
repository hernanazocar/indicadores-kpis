@echo off
REM Script para iniciar el dashboard en modo kiosko en Windows
REM Uso: scripts\start-kiosk.bat [url]
REM Si no se especifica URL, usa http://localhost:3000

set URL=%1
if "%URL%"=="" set URL=http://localhost:3000

echo.
echo ================================
echo  Indicadores KPIs - Modo Kiosko
echo ================================
echo.
echo URL: %URL%
echo.
echo Abriendo Chrome en modo kiosko...
echo.

start chrome --kiosk "%URL%" --disable-session-crashed-bubble --disable-infobars

echo.
echo Dashboard abierto en modo kiosko
echo.
echo Para salir del modo kiosko:
echo   - Presiona Alt + F4 o F11
echo.
pause
