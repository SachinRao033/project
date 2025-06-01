import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Lock, Mail } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn } = useAuth();
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsSubmitting(true);
    
    try {
      await signIn(email, password);
      router.replace('/(app)/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7794400/pexels-photo-7794400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.logoImage}
          />
          <Text style={[styles.logoText, { color: colors.text }]}>SysMonitor</Text>
        </View>
        
        <View style={[styles.formContainer, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
          <Text style={[styles.title, { color: colors.text }]}>Sign In</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Welcome back! Please sign in to continue.
          </Text>
          
          {error ? (
            <View style={[styles.errorContainer, { backgroundColor: colors.errorLight }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          ) : null}
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
              <Mail size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your email"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Password</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
              <Lock size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your password"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF\" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Don't have an account?{' '}
            </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: colors.primary }]}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  logoText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 12,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 24,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});