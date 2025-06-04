import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

type Translations = {
  en: {
    auth: {
      welcome: string;
      signIn: string;
      createAccount: string;
      email: string;
      password: string;
      confirmPassword: string;
      displayName: string;
      register: string;
      signInWithGoogle: string;
      signInWithApple: string;
      or: string;
      alreadyHaveAccount: string;
      dontHaveAccount: string;
      terms: string;
    };
    errors: {
      allFieldsRequired: string;
      displayNameRequired: string;
      passwordsDontMatch: string;
      googleSignInFailed: string;
      invalidEmail: string;
      weakPassword: string;
      emailInUse: string;
      userNotFound: string;
      wrongPassword: string;
      authError: string;
    };
  };
  pl: {
    auth: {
      welcome: string;
      signIn: string;
      createAccount: string;
      email: string;
      password: string;
      confirmPassword: string;
      displayName: string;
      register: string;
      signInWithGoogle: string;
      signInWithApple: string;
      or: string;
      alreadyHaveAccount: string;
      dontHaveAccount: string;
      terms: string;
    };
    errors: {
      allFieldsRequired: string;
      displayNameRequired: string;
      passwordsDontMatch: string;
      googleSignInFailed: string;
      invalidEmail: string;
      weakPassword: string;
      emailInUse: string;
      userNotFound: string;
      wrongPassword: string;
      authError: string;
    };
  };
};

const translations: Translations = {
  en: {
    auth: {
      welcome: 'Welcome to Fitly',
      signIn: 'Sign in to your account',
      createAccount: 'Create a new account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      displayName: 'Display Name',
      register: 'Register',
      signInWithGoogle: 'Continue with Google',
      signInWithApple: 'Continue with Apple',
      or: 'OR',
      alreadyHaveAccount: 'Already have an account? Sign in',
      dontHaveAccount: 'Don\'t have an account? Sign up',
      terms: 'By continuing, you agree to our Terms of Service and Privacy Policy',
    },
    errors: {
      allFieldsRequired: 'All fields are required',
      displayNameRequired: 'Display name is required',
      passwordsDontMatch: 'Passwords do not match',
      googleSignInFailed: 'Google sign in failed',
      invalidEmail: 'Invalid email address',
      weakPassword: 'Password is too weak',
      emailInUse: 'Email is already in use',
      userNotFound: 'User not found',
      wrongPassword: 'Wrong password',
      authError: 'Authentication error',
    },
  },
  pl: {
    auth: {
      welcome: 'Witaj w Fitly',
      signIn: 'Zaloguj się do swojego konta',
      createAccount: 'Utwórz nowe konto',
      email: 'Email',
      password: 'Hasło',
      confirmPassword: 'Potwierdź hasło',
      displayName: 'Nazwa użytkownika',
      register: 'Zarejestruj się',
      signInWithGoogle: 'Kontynuuj z Google',
      signInWithApple: 'Kontynuuj z Apple',
      or: 'LUB',
      alreadyHaveAccount: 'Masz już konto? Zaloguj się',
      dontHaveAccount: 'Nie masz konta? Zarejestruj się',
      terms: 'Kontynuując, zgadzasz się na nasze Warunki korzystania z usługi i Politykę prywatności',
    },
    errors: {
      allFieldsRequired: 'Wszystkie pola są wymagane',
      displayNameRequired: 'Nazwa użytkownika jest wymagana',
      passwordsDontMatch: 'Hasła nie są takie same',
      googleSignInFailed: 'Logowanie przez Google nie powiodło się',
      invalidEmail: 'Nieprawidłowy adres email',
      weakPassword: 'Hasło jest za słabe',
      emailInUse: 'Email jest już używany',
      userNotFound: 'Nie znaleziono użytkownika',
      wrongPassword: 'Nieprawidłowe hasło',
      authError: 'Błąd uwierzytelniania',
    },
  },
};

const i18n = new I18n(translations);

// Get the device locale and ensure it's a string
const deviceLocale = Localization.locale?.split('-')[0] || 'en';

// Set the locale only if it exists in translations
const locale = deviceLocale in translations ? deviceLocale : 'en';
(i18n as any).locale = locale;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n; 