import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useAuthStore } from '@store/auth.store';
import i18n from '@i18n/translations';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '@context/AuthContext';

function RootLayout() {
  const { user } = useAuthStore();

  useEffect(() => {
    // Initialize i18n
    i18n.enableFallback = true;
    i18n.defaultLocale = 'en';
  }, []);

  return (
    <PaperProvider>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            {!user ? (
              // Auth group
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />
            ) : (
              <>
                {/* Protected routes */}
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="onboarding"
                  options={{
                    headerShown: false,
                  }}
                />
              </>
            )}
          </Stack>
        </GestureHandlerRootView>
      </AuthProvider>
    </PaperProvider>
  );
}

export default RootLayout;