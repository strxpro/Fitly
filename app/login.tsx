import { View, StyleSheet, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import useAuth from '../src/hooks/useAuth';

export default function LoginScreen() {
  const { signInWithGoogle, signInWithApple, isLoading } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(auth)');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
      router.replace('/(auth)');
    } catch (error) {
      console.error('Apple sign-in error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome Back
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleGoogleSignIn}
          loading={isLoading}
          disabled={isLoading}
          icon="google"
          style={styles.button}
        >
          Continue with Google
        </Button>

        {Platform.OS === 'ios' && (
          <Button
            mode="contained"
            onPress={handleAppleSignIn}
            loading={isLoading}
            disabled={isLoading}
            icon="apple"
            style={[styles.button, styles.appleButton]}
          >
            Continue with Apple
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    borderRadius: 8,
  },
  appleButton: {
    backgroundColor: '#000',
  },
}); 