// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Tracking-Aot',
    slug: 'tracking-aot',
    version: '1.0.0',
    scheme: 'meta',
    orientation: 'portrait',
    icon: './assets/corona.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    extra: {
      host: "192.168.18.25",
      eas:{
         projectId: "63f98d9a-6f67-4a94-bd8d-085d71d5ff6f"
      }
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.ninodev1.trackingoat",
      adaptiveIcon: {
        foregroundImage: './assets/corona.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      usesCleartextTraffic: true,   // 👈 NECESARIO
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: ['expo-router'],
  },
};
