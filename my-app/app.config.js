// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'my-app',
    slug: 'my-app',
    version: '1.0.0',
    scheme: 'meta',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    extra: {
      host: "52.23.170.150",
      eas:{
         projectId: "ae7be154-bc88-495d-b52a-65a786ebae6e"
      }
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.ninodev1.myapp",
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
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
