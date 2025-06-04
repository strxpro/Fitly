declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

// Font declarations
declare module '@expo-google-fonts/inter' {
  import { FontSource } from 'expo-font';
  
  export const Inter_400Regular: FontSource;
  export const Inter_500Medium: FontSource;
  export const Inter_600SemiBold: FontSource;
  export const Inter_700Bold: FontSource;
}

// Environment variables
declare module '@env' {
  export const EXPO_PUBLIC_FIREBASE_API_KEY: string;
  export const EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  export const EXPO_PUBLIC_FIREBASE_PROJECT_ID: string;
  export const EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  export const EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  export const EXPO_PUBLIC_FIREBASE_APP_ID: string;
  export const EXPO_PUBLIC_ANDROID_CLIENT_ID: string;
  export const EXPO_PUBLIC_IOS_CLIENT_ID: string;
  export const EXPO_PUBLIC_WEB_CLIENT_ID: string;
} 