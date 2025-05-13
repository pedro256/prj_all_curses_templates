import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login, isLoading } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    setLoginError('');
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    try {
      await login(email, password);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
            style={styles.logo}
          />
          <Text style={styles.title}>LearnHub</Text>
          <Text style={styles.subtitle}>Access premium courses and expand your knowledge</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.loginText}>Log In</Text>
          
          {loginError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{loginError}</Text>
            </View>
          ) : null}
          
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            keyboardType="email-address"
            error={emailError}
          />
          
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            error={passwordError}
          />
          
          <Button
            title="Log In"
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.loginButton}
          />
          
          <Text style={styles.helpText}>
            Use any email and password with 6+ characters for demo
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom:100
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#3E64FF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    maxWidth: 300,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingBottom:40
  },
  loginText: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 16,
  },
  errorContainer: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FC8181',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorMessage: {
    color: '#E53E3E',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  helpText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#718096',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});