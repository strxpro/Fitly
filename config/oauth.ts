// Konfiguracja OAuth dla Google
export const GOOGLE_CONFIG = {
  // Zastąp tymi danymi z Google Cloud Console
  androidClientId: 'YOUR_ANDROID_CLIENT_ID',
  iosClientId: 'YOUR_IOS_CLIENT_ID',
  webClientId: 'YOUR_WEB_CLIENT_ID',
  scopes: [
    'profile',
    'email',
  ],
  // Upewnij się, że te URI są skonfigurowane w Google Cloud Console
  redirectUri: {
    android: 'com.yourcompany.fitly:/oauth2redirect',
    ios: 'com.yourcompany.fitly:/oauth2redirect',
    web: 'https://auth.expo.io/@your-username/fitly',
  },
};

// Instrukcje konfiguracji Google OAuth:
/*
1. Przejdź do Google Cloud Console (https://console.cloud.google.com)
2. Stwórz nowy projekt lub wybierz istniejący
3. Włącz Google Sign-In API
4. Skonfiguruj ekran zgody OAuth:
   - Dodaj wymagane zakresy (email, profile)
   - Ustaw status aplikacji na "Produkcja" jeśli potrzebujesz więcej niż 100 użytkowników
5. Stwórz poświadczenia OAuth 2.0:
   - Typ aplikacji: Android, iOS, Web
   - Dodaj odpowiednie URI przekierowania dla każdej platformy
   - Skopiuj ID klienta do odpowiednich pól powyżej
6. Dla Androida:
   - Dodaj odcisk palca SHA-1 w konsoli Google
   - Upewnij się, że package name w app.json zgadza się z konfiguracją
7. Dla iOS:
   - Upewnij się, że bundleIdentifier w app.json zgadza się z konfiguracją
8. Dla Web:
   - Dodaj dozwolone domeny w konsoli Google
   - Upewnij się, że URI przekierowania jest poprawne
*/ 