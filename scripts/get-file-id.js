#!/usr/bin/env node

/**
 * Script para obtener el File ID de un archivo en OneDrive
 *
 * Uso:
 *   node scripts/get-file-id.js "nombre-del-archivo.xlsx"
 *
 * Requiere:
 *   - NEXT_PUBLIC_AZURE_CLIENT_ID configurado
 *   - NEXT_PUBLIC_AZURE_TENANT_ID configurado
 *   - Iniciar sesión interactivamente
 */

const { Client } = require('@microsoft/microsoft-graph-client');
const { PublicClientApplication } = require('@azure/msal-node');
require('dotenv').config({ path: '.env.local' });

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}`,
  },
};

const tokenRequest = {
  scopes: ['Files.Read', 'Files.Read.All'],
};

async function getFileId(fileName) {
  if (!process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || !process.env.NEXT_PUBLIC_AZURE_TENANT_ID) {
    console.error('❌ Error: Variables de entorno no configuradas');
    console.error('Por favor, configura NEXT_PUBLIC_AZURE_CLIENT_ID y NEXT_PUBLIC_AZURE_TENANT_ID en .env.local');
    process.exit(1);
  }

  console.log('🔐 Iniciando autenticación...\n');

  const pca = new PublicClientApplication(msalConfig);

  try {
    // Autenticación con código de dispositivo
    const deviceCodeRequest = {
      ...tokenRequest,
      deviceCodeCallback: (response) => {
        console.log('📱 Inicia sesión en tu navegador:\n');
        console.log(`   ${response.message}\n`);
      },
    };

    const response = await pca.acquireTokenByDeviceCode(deviceCodeRequest);
    const accessToken = response.accessToken;

    console.log('✅ Autenticación exitosa\n');
    console.log('📂 Buscando archivos en OneDrive...\n');

    // Crear cliente de Microsoft Graph
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    // Buscar archivos
    const files = await client.api('/me/drive/root/children').get();

    if (!fileName) {
      // Listar todos los archivos
      console.log('📋 Archivos encontrados:\n');
      files.value.forEach((file, index) => {
        if (file.file) {
          console.log(`${index + 1}. ${file.name}`);
          console.log(`   ID: ${file.id}`);
          console.log(`   Tamaño: ${(file.size / 1024).toFixed(2)} KB`);
          console.log(`   Modificado: ${new Date(file.lastModifiedDateTime).toLocaleString()}\n`);
        }
      });
      return;
    }

    // Buscar archivo específico
    const file = files.value.find((f) =>
      f.name.toLowerCase().includes(fileName.toLowerCase()) && f.file
    );

    if (file) {
      console.log('✅ Archivo encontrado!\n');
      console.log(`📄 Nombre: ${file.name}`);
      console.log(`📦 ID: ${file.id}`);
      console.log(`📏 Tamaño: ${(file.size / 1024).toFixed(2)} KB`);
      console.log(`📅 Modificado: ${new Date(file.lastModifiedDateTime).toLocaleString()}\n`);
      console.log('📋 Copia este ID en tu .env.local:');
      console.log(`   NEXT_PUBLIC_EXCEL_FILE_ID=${file.id}\n`);

      // Intentar obtener las hojas del Excel
      try {
        console.log('📊 Hojas del Excel:');
        const workbook = await client.api(`/me/drive/items/${file.id}/workbook/worksheets`).get();
        workbook.value.forEach((sheet, index) => {
          console.log(`   ${index + 1}. ${sheet.name}`);
        });
        console.log('\n💡 Usa una de estas hojas en NEXT_PUBLIC_EXCEL_SHEET_NAME\n');
      } catch (error) {
        console.log('⚠️  No se pudieron leer las hojas (esto es normal si el archivo no está abierto en Excel Online)\n');
      }
    } else {
      console.log(`❌ No se encontró ningún archivo con el nombre "${fileName}"\n`);
      console.log('📋 Archivos disponibles:');
      files.value
        .filter((f) => f.file)
        .forEach((f, index) => {
          console.log(`   ${index + 1}. ${f.name}`);
        });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.errorCode === 'invalid_client') {
      console.error('\n💡 Solución: Verifica que tu AZURE_CLIENT_ID y AZURE_TENANT_ID sean correctos');
    }
  }
}

// Ejecutar
const fileName = process.argv[2];

if (!fileName) {
  console.log('📂 Buscador de File ID para OneDrive\n');
  console.log('Uso:');
  console.log('  node scripts/get-file-id.js "nombre-archivo.xlsx"  → Buscar archivo específico');
  console.log('  node scripts/get-file-id.js                         → Listar todos los archivos\n');
  getFileId();
} else {
  getFileId(fileName);
}
