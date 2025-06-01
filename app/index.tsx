import { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function RootScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  // Automatically redirect based on auth state
  if (!isLoading) {
    if (isAuthenticated) {
      return <Redirect href="/(app)/" />;
    } else {
      return <Redirect href="/(auth)/login" />;
    }
  }

  // Show loading indicator while checking auth status
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});