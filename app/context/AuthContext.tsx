import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { AppleAuthenticationScope, AppleAuthenticationCredential } from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();

type User = {
  id: string;
  email: string;
  name: string | null;
  photoUrl?: string;
  provider: 'google' | 'apple';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configure Google Auth with proper scopes and configuration
  const [request, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    androidClientId: '123456789-example.apps.googleusercontent.com', // Zastąp swoim Android Client ID
    iosClientId: '123456789-example.apps.googleusercontent.com', // Zastąp swoim iOS Client ID
    webClientId: '123456789-example.apps.googleusercontent.com', // Zastąp swoim Web Client ID
    redirectUri: makeRedirectUri({
      scheme: 'fitly',
      path: 'auth'
    }),
    scopes: [
      'profile',
      'email'
    ],
    responseType: "id_token",
    usePKCE: true,
    selectAccount: true
  });

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { authentication } = googleResponse;
      fetchGoogleUserInfo(authentication?.accessToken);
    }
  }, [googleResponse]);

  const fetchGoogleUserInfo = async (accessToken: string | undefined) => {
    if (!accessToken) return;

    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      if (!response.ok) {
        throw new Error('Błąd pobierania danych użytkownika Google');
      }
      
      const userInfo = await response.json();

      setUser({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        photoUrl: userInfo.picture,
        provider: 'google',
      });
    } catch (error) {
      console.error('Błąd pobierania informacji o użytkowniku Google:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await googlePromptAsync();
      if (result.type === 'success') {
        // Authentication successful, the useEffect above will handle the user info
      } else {
        throw new Error('Logowanie Google zostało anulowane lub wystąpił błąd');
      }
    } catch (error) {
      console.error('Błąd logowania Google:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      setIsLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        setUser({
          id: credential.user,
          email: credential.email ?? '',
          name: credential.fullName 
            ? `${credential.fullName.givenName ?? ''} ${credential.fullName.familyName ?? ''}`.trim() 
            : null,
          provider: 'apple',
        });
        await saveAppleCredential(credential);
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'ERR_CANCELED') {
        console.log('Logowanie Apple zostało anulowane przez użytkownika');
      } else {
        console.error('Błąd logowania Apple:', error);
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveAppleCredential = async (credential: AppleAuthenticationCredential) => {
    try {
      // Tu możesz dodać kod do bezpiecznego przechowywania poświadczeń
      // Na przykład używając SecureStore
      // await SecureStore.setItemAsync('appleCredential', JSON.stringify(credential));
    } catch (error) {
      console.error('Błąd zapisywania poświadczeń Apple:', error);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      // Wyczyść dane użytkownika
      setUser(null);
      
      // Wyczyść zapisane poświadczenia
      // await SecureStore.deleteItemAsync('appleCredential');
    } catch (error) {
      console.error('Błąd wylogowania:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        // Tu możesz dodać sprawdzanie zapisanych poświadczeń
        // Na przykład używając SecureStore
        setIsLoading(false);
      } catch (error) {
        console.error('Błąd sprawdzania istniejącej sesji:', error);
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 