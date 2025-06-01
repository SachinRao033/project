import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isLoading]);

  // If still loading or not authenticated, don't render anything yet
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
    </Stack>
  );
}