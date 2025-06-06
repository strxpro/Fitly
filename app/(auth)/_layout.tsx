import { Redirect, Stack } from 'expo-router';
import useAuth from '@hooks/useAuth';

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    return null;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Redirect href="/login" />;
  }

  // Show protected routes
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Protected Area',
        }}
      />
    </Stack>
  );
}

export { default } from './_layout'; 