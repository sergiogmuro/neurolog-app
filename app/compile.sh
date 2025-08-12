#!/bin/bash
set -e

APP_NAME="NeuroLog"
APP_ID="com.bromuroapp.neurolog"

npx cap init ${APP_NAME} ${APP_ID}
npx cap add android
npx cap add ios
npx cap copy

echo "📦 Construyendo la app React..."
npm run build

echo "🔄 Sincronizando con Capacitor..."
npx cap sync android
npx cap sync ios

echo "📱 Abriendo en Android Studio..."
npx cap open android

echo "🍏 Abriendo en Xcode..."
npx cap open ios

echo "✅ Listo. Puedes compilar para Android o iOS desde sus IDEs."
