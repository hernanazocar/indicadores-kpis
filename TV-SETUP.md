# 📺 Configuración para TV en Oficina

Guía completa para instalar el dashboard en una TV o monitor dedicado en la oficina.

## 🎯 Opciones de Configuración

### Opción 1: Computadora dedicada (Más estable)
✅ Recomendado para uso 24/7
✅ Mayor control
✅ Fácil de actualizar

### Opción 2: Raspberry Pi (Más económico)
✅ Bajo consumo eléctrico
✅ Compacto
✅ Económico

### Opción 3: Despliegue en la nube (Más simple)
✅ Sin hardware dedicado
✅ Accesible desde cualquier lugar
✅ Gratis con Vercel

---

## 💻 Opción 1: Computadora Dedicada

### Windows

**1. Configurar auto-inicio**

Crea un archivo `C:\Users\TuUsuario\start-dashboard.bat`:

```batch
@echo off
cd C:\Users\TuUsuario\developers\indicadores-kpis
start /B npm start
timeout /t 15
start chrome --kiosk "http://localhost:3000" --disable-infobars
```

**2. Agregar al inicio automático**

```
1. Win + R
2. Escribe: shell:startup
3. Copia el archivo .bat ahí
```

**3. Configurar Windows**

- Desactiva el protector de pantalla
- Configura "Never sleep" en Power Options
- Desactiva actualizaciones automáticas (o configúralas fuera del horario laboral)
- Oculta la barra de tareas: Clic derecho → Automatically hide

### macOS

**1. Crear script de inicio**

```bash
nano ~/start-dashboard.sh
```

Pega esto:
```bash
#!/bin/bash
cd ~/developers/indicadores-kpis
npm start &
sleep 15
open -a "Google Chrome" --args --kiosk "http://localhost:3000" --disable-infobars
```

Hazlo ejecutable:
```bash
chmod +x ~/start-dashboard.sh
```

**2. Agregar a Login Items**

```
1. System Preferences → Users & Groups
2. Login Items → +
3. Agrega el script start-dashboard.sh
```

**3. Configurar macOS**

- System Preferences → Energy Saver → Never sleep
- System Preferences → Desktop & Screen Saver → Never
- Ocultar Dock: Preferences → Automatically hide

### Linux (Ubuntu)

**1. Crear script de inicio**

```bash
nano ~/start-dashboard.sh
```

```bash
#!/bin/bash
cd ~/developers/indicadores-kpis
npm start &
sleep 15
google-chrome --kiosk "http://localhost:3000" --disable-infobars
```

```bash
chmod +x ~/start-dashboard.sh
```

**2. Agregar a Startup Applications**

```
1. Busca "Startup Applications"
2. Add → Name: Dashboard KPIs
3. Command: /home/usuario/start-dashboard.sh
```

**3. Configurar Ubuntu**

```bash
# Desactivar screen saver
gsettings set org.gnome.desktop.session idle-delay 0

# Desactivar suspensión
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

---

## 🥧 Opción 2: Raspberry Pi

### Hardware Necesario
- Raspberry Pi 4 (4GB RAM recomendado)
- Tarjeta microSD (32GB mínimo)
- Cable HDMI
- Fuente de alimentación USB-C

### Instalación

**1. Instalar Raspberry Pi OS**

Usa Raspberry Pi Imager: https://www.raspberrypi.com/software/

**2. Configurar SSH y WiFi**

En la SD antes de bootear, crea:
- `ssh` (archivo vacío)
- `wpa_supplicant.conf`:

```
country=CL
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="NombreWiFi"
    psk="ContraseñaWiFi"
}
```

**3. Instalar Node.js**

```bash
ssh pi@raspberrypi.local
# Contraseña default: raspberry

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
```

**4. Clonar y configurar proyecto**

```bash
git clone <tu-repo-url> indicadores-kpis
cd indicadores-kpis
npm install
cp .env.local.example .env.local
nano .env.local
# Configurar variables
npm run build
```

**5. Auto-inicio con systemd**

```bash
sudo nano /etc/systemd/system/dashboard.service
```

```ini
[Unit]
Description=Dashboard KPIs
After=network.target

[Service]
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/pi/indicadores-kpis
StandardOutput=inherit
StandardError=inherit
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable dashboard.service
sudo systemctl start dashboard.service
```

**6. Configurar Chromium en kiosko**

```bash
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```

Agrega:
```
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --kiosk --disable-infobars http://localhost:3000
```

**7. Reboot**

```bash
sudo reboot
```

---

## ☁️ Opción 3: Despliegue en la Nube (Vercel)

### Ventajas
- Sin hardware dedicado
- SSL automático (HTTPS)
- CDN global
- Gratis

### Instalación

**1. Instalar Vercel CLI**

```bash
npm i -g vercel
```

**2. Desplegar**

```bash
cd ~/developers/indicadores-kpis
vercel
```

Sigue el wizard:
- New project? Yes
- Name: indicadores-kpis
- Override settings? No

**3. Configurar variables de entorno**

Ve a https://vercel.com/dashboard

```
1. Selecciona tu proyecto
2. Settings → Environment Variables
3. Agrega todas las variables de .env.local:
   - NEXT_PUBLIC_AZURE_CLIENT_ID
   - NEXT_PUBLIC_AZURE_TENANT_ID
   - NEXT_PUBLIC_EXCEL_FILE_ID
   - NEXT_PUBLIC_EXCEL_SHEET_NAME
   - NEXT_PUBLIC_REFRESH_INTERVAL
4. Redeploy
```

**4. Actualizar Azure Redirect URI**

```
1. Ve a Azure Portal → App Registrations
2. Authentication → Add URI
3. Agrega: https://tu-proyecto.vercel.app
4. Save
```

**5. Abrir en TV**

En la TV/monitor:
```
1. Abre Chrome
2. Ve a https://tu-proyecto.vercel.app
3. Presiona F11 (fullscreen)
```

Para auto-inicio, usa una computadora pequeña con el script de kiosko apuntando a tu URL de Vercel.

---

## 🎨 Optimizaciones para TV

### Zoom del navegador

Si el texto se ve muy pequeño:
```
Ctrl + (zoom in)
Ctrl - (zoom out)
Ctrl 0 (reset)
```

### Resolución recomendada

- 1920x1080 (Full HD) - Ideal
- 1280x720 (HD) - Aceptable
- 3840x2160 (4K) - Usa zoom 150-200%

### Prevenir quemado de pantalla

```javascript
// Agrega esto a app/globals.css para alternar sutilmente los colores
@keyframes subtle-shift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(5deg); }
}

body {
  animation: subtle-shift 300s ease-in-out infinite;
}
```

### Mantener la pantalla encendida

**Windows:**
```
Control Panel → Power Options → Change plan settings
→ Turn off display: Never
```

**macOS:**
```
System Preferences → Energy Saver
→ Turn display off after: Never
```

**Linux:**
```bash
gsettings set org.gnome.desktop.session idle-delay 0
```

---

## 🔧 Mantenimiento

### Actualizar datos

El dashboard se actualiza automáticamente cada 5 minutos (configurable en `NEXT_PUBLIC_REFRESH_INTERVAL`)

### Actualizar el código

```bash
cd ~/developers/indicadores-kpis
git pull
npm install
npm run build
# Si usas systemd:
sudo systemctl restart dashboard.service
```

### Monitoreo

**Ver logs en tiempo real:**

```bash
# Si usas systemd
sudo journalctl -u dashboard.service -f

# Si usas npm start
tail -f ~/.pm2/logs/dashboard-out.log
```

### Reinicio automático en caso de error

**Usar PM2 (recomendado):**

```bash
npm install -g pm2
cd ~/developers/indicadores-kpis
pm2 start npm --name "dashboard" -- start
pm2 save
pm2 startup
```

---

## 🚨 Troubleshooting

### El dashboard no carga al encender la computadora

✅ Aumenta el delay en el script de inicio de 10s a 30s

### La pantalla se pone en negro después de un tiempo

✅ Verifica configuración de ahorro de energía
✅ Desactiva protector de pantalla

### El navegador muestra "Restaurar páginas"

✅ Agrega `--disable-session-crashed-bubble` a los argumentos de Chrome

### Los datos no se actualizan

✅ Verifica que el servidor esté corriendo: `curl http://localhost:3000`
✅ Revisa los logs del servidor
✅ Verifica conexión a internet

---

## 📋 Checklist Final

- [ ] Hardware configurado (computadora/Raspberry Pi)
- [ ] Sistema operativo actualizado
- [ ] Node.js instalado (v18+)
- [ ] Proyecto clonado y dependencias instaladas
- [ ] Variables de entorno configuradas
- [ ] Auto-inicio configurado
- [ ] Modo kiosko funcionando
- [ ] Pantalla siempre encendida
- [ ] Protector de pantalla desactivado
- [ ] Zoom ajustado correctamente
- [ ] Datos actualizándose correctamente

---

**¡Listo! Tu dashboard está corriendo 24/7 en la oficina 🎉**
