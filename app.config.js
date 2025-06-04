export default {
  expo: {
    name: 'Fitly',
    slug: 'fitly',
    version: '1.0.0',
    scheme: 'fitly',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: 'com.yourcompany.fitly',
      supportsTablet: true,
      config: {
        usesNonExemptEncryption: false
      }
    },
    android: {
      package: 'com.yourcompany.fitly',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    plugins: [
      'expo-apple-authentication',
      'expo-auth-session'
    ],
    extra: {
      eas: {
        projectId: "d5376aff-ee1f-41eb-8bba-999898e2ff07"
      },
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    },
    owner: "claudiotaras3"
  },
}; 