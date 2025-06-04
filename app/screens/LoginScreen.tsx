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
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLogo } from '../../components/AppLogo';
import { useAuthStore } from '@store/auth.store';
import i18n from '@app/config/i18n';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get('window');

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
      router.replace('/screens/LanguageSelectionScreen');
    } catch (err) {
      Alert.alert(i18n.t('errors.googleSignInFailed'));
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
      router.replace('/screens/LanguageSelectionScreen');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <AppLogo size={120} color={COLORS.white} />
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
              style={styles.authButton}
              onPress={handleEmailAuth}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.authButtonText}>
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
              <AntDesign name="google" size={24} color="#DB4437" />
              <Text style={styles.googleButtonText}>
                {i18n.t('auth.signInWithGoogle')}
              </Text>
            </TouchableOpacity>

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
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.8,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 15,
    paddingRight: 50,
    fontSize: 16,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  authButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.text.secondary,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  googleButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    marginLeft: 10,
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 5,
  },
  toggleButtonText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  termsText: {
    color: COLORS.white,
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
}); 