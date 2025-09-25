// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Tracking Aot',
    slug: 'track12',
    version: '1.0.0',
    scheme: 'meta',
    orientation: 'portrait',
    icon: './assets/flor2.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    extra: {
      host: "3.87.87.124",
      eas:{
         projectId: "7d4d14aa-8adc-447e-9b6b-85c42d24ecce"
      }
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.ninodev3.track12",
      adaptiveIcon: {
        foregroundImage: './assets/flor2.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      usesCleartextTraffic: true,   // 👈 NECESARIO
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      "expo-router"
    ]
  },
};
