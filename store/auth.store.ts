import { useState } from 'react';

export function useAuthStore() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    // Tu dodaj logikę logowania
    setIsLoading(false);
  };

  return { signInWithEmail, error, isLoading };
} 