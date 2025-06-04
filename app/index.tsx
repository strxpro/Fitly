import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Apple, Mail } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { memo } from 'react';

const AuthButton = memo(({ onPress, disabled, icon, text }: {
  onPress: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  text: string;
}) => (
  <TouchableOpacity 
    style={[styles.authButton, disabled && styles.authButtonDisabled]} 
    onPress={onPress}
    disabled={disabled}
  >
    {icon}
    <Text style={styles.authButtonText}>{text}</Text>
  </TouchableOpacity>
));

AuthButton.displayName = 'AuthButton';

export default function WelcomeScreen() {
  const router = useRouter();
  const { signInWithGoogle, signInWithApple, loading } = useAuth();

  const handleGoogleSignIn = useCallback(async () => {
    const success = await signInWithGoogle();
    if (success) {
      router.replace('/onboarding/goal');
    }
  }, [signInWithGoogle, router]);

  const handleAppleSignIn = useCallback(async () => {
    const success = await signInWithApple();
    if (success) {
      router.replace('/onboarding/goal');
    }
  }, [signInWithApple, router]);

  const handleEmailSignUp = useCallback(() => {
    router.replace('/onboarding/goal');
  }, [router]);

  const handleSignIn = useCallback(() => {
    router.replace('/(tabs)');
  }, [router]);

  return (
    <ImageBackground
      source={require('@/assets/images/welcome-bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo.jpg')}
              style={styles.logoPlaceholder}
              resizeMode="cover"
            />
            <Text style={styles.appName}>NutriPlan</Text>
            <Text style={styles.tagline}>Smart meals, better health</Text>
          </View>

          <View style={styles.authContainer}>
            <AuthButton
              onPress={handleGoogleSignIn}
              disabled={loading}
              icon={<Image 
                source={require('@/assets/images/google-icon.png')}
                style={styles.authIcon}
                resizeMode="contain"
              />}
              text="Continue with Google"
            />
            
            <AuthButton
              onPress={handleAppleSignIn}
              disabled={loading}
              icon={<Apple size={20} color="#374151" />}
              text="Continue with Apple"
            />

            <AuthButton
              onPress={handleEmailSignUp}
              disabled={loading}
              icon={<Mail size={20} color="#374151" />}
              text="Continue with Email"
            />

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account?</Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  authContainer: {
    marginBottom: 40,
    width: '100%',
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  authButtonDisabled: {
    opacity: 0.7,
  },
  authButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  authIcon: {
    width: 20,
    height: 20,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signInText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  signInLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});