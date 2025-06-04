import { useAuthStore } from '@store/auth.store';

export function useAuth() {
  const {
    user,
    isLoading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    clearError,
  } = useAuthStore();

  return {
    user,
    isLoading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    clearError,
  };
} 