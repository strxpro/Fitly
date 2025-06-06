import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@store/auth.store';
import i18n from '@i18n/translations';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();

const COLORS = {
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  white: '#FFFFFF',
  background: '#F9FAFB',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
  },
  error: '#EF4444',
  border: '#E5E7EB',
};

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, signUpWithEmail, error, isLoading, clearError } = useAuthStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleSignIn(id_token);
    }
  }, [response]);

  const handleGoogleSignIn = async (idToken: string) => {
    try {
      await signInWithGoogle(idToken);
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert(i18n.t('errors.googleSignInFailed'));
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // Here you would typically send the credential.identityToken to your server
      // or handle the sign-in process
      router.replace('/(tabs)');
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        // Handle user cancellation
      } else {
        Alert.alert('Apple Sign In Error', e.message);
      }
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert(i18n.t('errors.allFieldsRequired'));
      return false;
    }
    if (isRegistering) {
      if (!displayName) {
        Alert.alert(i18n.t('errors.displayNameRequired'));
        return false;
      }
      if (password !== confirmPassword) {
        Alert.alert(i18n.t('errors.passwordsDontMatch'));
        return false;
      }
    }
    return true;
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;

    try {
      if (isRegistering) {
        await signUpWithEmail(email, password, displayName);
      } else {
        await signInWithEmail(email, password);
      }
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert(error || i18n.t('errors.authError'));
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    clearError();
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.welcomeText}>{i18n.t('auth.welcome')}</Text>
            <Text style={styles.subtitleText}>
              {i18n.t(isRegistering ? 'auth.createAccount' : 'auth.signIn')}
            </Text>
          </View>

          <View style={styles.formContainer}>
            {isRegistering && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('auth.displayName')}
                  placeholderTextColor={COLORS.text.secondary}
                  value={displayName}
                  onChangeText={setDisplayName}
                  autoCapitalize="words"
                />
                <Ionicons name="person-outline" size={24} color={COLORS.text.secondary} style={styles.inputIcon} />
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={i18n.t('auth.email')}
                placeholderTextColor={COLORS.text.secondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <Ionicons name="mail-outline" size={24} color={COLORS.text.secondary} style={styles.inputIcon} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={i18n.t('auth.password')}
                placeholderTextColor={COLORS.text.secondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.inputIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color={COLORS.text.secondary}
                />
              </TouchableOpacity>
            </View>

            {isRegistering && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('auth.confirmPassword')}
                  placeholderTextColor={COLORS.text.secondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="password"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.inputIcon}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color={COLORS.text.secondary}
                  />
                </TouchableOpacity>
              </View>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleEmailAuth}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.primaryButtonText}>
                  {i18n.t(isRegistering ? 'auth.register' : 'auth.signIn')}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>{i18n.t('auth.or')}</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => promptAsync()}
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text style={styles.socialButtonText}>
                {i18n.t('auth.signInWithGoogle')}
              </Text>
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={8}
                style={styles.appleButton}
                onPress={handleAppleSignIn}
              />
            )}

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleAuthMode}
            >
              <Text style={styles.toggleButtonText}>
                {isRegistering
                  ? i18n.t('auth.alreadyHaveAccount')
                  : i18n.t('auth.dontHaveAccount')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Text style={styles.termsText}>{i18n.t('auth.terms')}</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginTop: 10,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    paddingRight: 48,
    fontSize: 16,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.text.secondary,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  socialButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  appleButton: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  toggleButtonText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  termsText: {
    color: COLORS.text.secondary,
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 0 : 20,
  },
}); 