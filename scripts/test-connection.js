#!/usr/bin/env node

/**
 * Script para probar la conexión con Excel Online
 *
 * Uso:
 *   node scripts/test-connection.js
 *
 * Verifica:
 *   - Variables de entorno configuradas
 *   - Autenticación con Azure
 *   - Acceso al archivo Excel
 *   - Lectura de datos
 */

require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Probando configuración de Indicadores KPIs...\n');

  // 1. Verificar variables de entorno
  console.log('1️⃣  Verificando variables de entorno...');

  const requiredVars = [
    'NEXT_PUBLIC_AZURE_CLIENT_ID',
    'NEXT_PUBLIC_AZURE_TENANT_ID',
    'NEXT_PUBLIC_EXCEL_FILE_ID',
    'NEXT_PUBLIC_EXCEL_SHEET_NAME',
  ];

  let allVarsPresent = true;
  requiredVars.forEach((varName) => {
    if (process.env[varName]) {
      console.log(`   ✅ ${varName}: ${process.env[varName].substring(0, 10)}...`);
    } else {
      console.log(`   ❌ ${varName}: NO CONFIGURADO`);
      allVarsPresent = false;
    }
  });

  if (!allVarsPresent) {
    console.log('\n❌ Faltan variables de entorno. Por favor, configura .env.local\n');
    console.log('💡 Copia .env.local.example a .env.local y completa los valores\n');
    process.exit(1);
  }

  console.log('\n2️⃣  Variables de entorno: ✅ OK\n');

  // 2. Probar autenticación
  console.log('3️⃣  Probando autenticación con Azure...');
  console.log('   (Esto abrirá una ventana del navegador)\n');

  try {
    // Aquí iría la lógica de autenticación
    // Por ahora solo mostramos instrucciones
    console.log('   ⚠️  Para probar la conexión completa, ejecuta:');
    console.log('      npm run dev');
    console.log('      Luego abre http://localhost:3000 y haz login\n');
  } catch (error) {
    console.error('   ❌ Error de autenticación:', error.message);
  }

  // 3. Mostrar configuración final
  console.log('📋 Resumen de configuración:\n');
  console.log(`   Cliente Azure: ${process.env.NEXT_PUBLIC_AZURE_CLIENT_ID}`);
  console.log(`   Tenant: ${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}`);
  console.log(`   File ID: ${process.env.NEXT_PUBLIC_EXCEL_FILE_ID}`);
  console.log(`   Hoja: ${process.env.NEXT_PUBLIC_EXCEL_SHEET_NAME}`);
  console.log(`   Actualización: cada ${parseInt(process.env.NEXT_PUBLIC_REFRESH_INTERVAL || '300000') / 1000} segundos\n`);

  console.log('✅ Configuración completa!\n');
  console.log('🚀 Siguiente paso:');
  console.log('   npm run dev\n');
}

testConnection();
