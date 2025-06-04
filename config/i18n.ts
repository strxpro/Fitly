import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Translations = {
  en: {
    auth: {
      welcome: string;
      signIn: string;
      signInWithGoogle: string;
      signInWithGmail: string;
      createAccount: string;
      or: string;
      email: string;
      password: string;
      confirmPassword: string;
      forgotPassword: string;
      register: string;
      alreadyHaveAccount: string;
      signInHere: string;
      terms: string;
    };
    errors: {
      googleSignInFailed: string;
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordTooShort: string;
      passwordsDontMatch: string;
    };
    languageSelection: {
      title: string;
      description: string;
      continue: string;
    };
  };
  pl: {
    auth: {
      welcome: string;
      signIn: string;
      signInWithGoogle: string;
      signInWithGmail: string;
      createAccount: string;
      or: string;
      email: string;
      password: string;
      confirmPassword: string;
      forgotPassword: string;
      register: string;
      alreadyHaveAccount: string;
      signInHere: string;
      terms: string;
    };
    errors: {
      googleSignInFailed: string;
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordTooShort: string;
      passwordsDontMatch: string;
    };
    languageSelection: {
      title: string;
      description: string;
      continue: string;
    };
  };
};

const translations: Translations = {
  en: {
    auth: {
      welcome: 'Welcome to Fitly!',
      signIn: 'Sign in to continue',
      signInWithGoogle: 'Continue with Google',
      signInWithGmail: 'Continue with Gmail',
      createAccount: 'Create Account',
      or: 'or',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      register: 'Register',
      alreadyHaveAccount: 'Already have an account?',
      signInHere: 'Sign in here',
      terms: 'By continuing, you agree to our Terms of Service and Privacy Policy',
    },
    errors: {
      googleSignInFailed: 'Google sign in failed. Please check your account settings.',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 6 characters',
      passwordsDontMatch: 'Passwords do not match',
    },
    languageSelection: {
      title: 'Choose Your Language',
      description: 'Select your preferred language for the app',
      continue: 'Continue',
    },
  },
  pl: {
    auth: {
      welcome: 'Witaj w Fitly!',
      signIn: 'Zaloguj się, aby kontynuować',
      signInWithGoogle: 'Kontynuuj z Google',
      signInWithGmail: 'Kontynuuj z Gmail',
      createAccount: 'Utwórz Konto',
      or: 'lub',
      email: 'Email',
      password: 'Hasło',
      confirmPassword: 'Potwierdź Hasło',
      forgotPassword: 'Zapomniałeś hasła?',
      register: 'Zarejestruj się',
      alreadyHaveAccount: 'Masz już konto?',
      signInHere: 'Zaloguj się tutaj',
      terms: 'Kontynuując, akceptujesz nasz Regulamin i Politykę Prywatności',
    },
    errors: {
      googleSignInFailed: 'Logowanie przez Google nie powiodło się. Sprawdź ustawienia konta.',
      emailRequired: 'Email jest wymagany',
      emailInvalid: 'Wprowadź poprawny adres email',
      passwordRequired: 'Hasło jest wymagane',
      passwordTooShort: 'Hasło musi mieć co najmniej 6 znaków',
      passwordsDontMatch: 'Hasła nie są takie same',
    },
    languageSelection: {
      title: 'Wybierz Język',
      description: 'Wybierz preferowany język aplikacji',
      continue: 'Kontynuuj',
    },
  },
};

const i18n = new I18n(translations);

// Default to English
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

// Function to set language
export const setLanguage = async (language: keyof Translations) => {
  (i18n as any).locale = language;
  try {
    await AsyncStorage.setItem('userLanguage', language);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

// Function to initialize language
export const initializeLanguage = async () => {
  try {
    // Check saved language
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    if (savedLanguage && savedLanguage in translations) {
      (i18n as any).locale = savedLanguage;
      return;
    }

    // If no saved language, use system language
    const deviceLocale = getLocales()[0]?.languageCode || 'en';
    (i18n as any).locale = deviceLocale in translations ? deviceLocale : 'en';
  } catch (error) {
    console.error('Error loading language preference:', error);
    (i18n as any).locale = 'en'; // Fallback to English
  }
};

export default i18n; 