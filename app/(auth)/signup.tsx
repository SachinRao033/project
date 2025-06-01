import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Lock, Mail, User } from 'lucide-react-native';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signUp } = useAuth();
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setIsSubmitting(true);
    
    try {
      await signUp(email, password, name);
      router.replace('/(app)/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
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
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sign up to get started with SysMonitor
          </Text>
          
          {error ? (
            <View style={[styles.errorContainer, { backgroundColor: colors.errorLight }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          ) : null}
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Full Name</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
              <User size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.placeholder}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
          
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
                placeholder="Create a password"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Confirm Password</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
              <Lock size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirm your password"
                placeholderTextColor={colors.placeholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.signupButton, { backgroundColor: colors.primary }]}
            onPress={handleSignup}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF\" size="small" />
            ) : (
              <Text style={styles.signupButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: colors.primary }]}>Sign In</Text>
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
  signupButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  signupButtonText: {
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