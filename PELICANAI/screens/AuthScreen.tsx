import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithEmail, signUpWithEmail } = useAuth();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithEmail(email, password);
      // Navigation to the main app will be handled by App.tsx based on session state
    } catch (error: any) {
      Alert.alert('Sign In Error', error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await signUpWithEmail(email, password);
      if (error) throw error;
      // Depending on your Supabase project settings (e.g., email confirmation),
      // the user might not be signed in immediately.
      Alert.alert('Sign Up Successful', 'Please check your email to confirm your account if required, then sign in.');
    } catch (error: any) {
      Alert.alert('Sign Up Error', error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PelicanAI Auth</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLoading ? "Signing In..." : "Sign In"} onPress={handleSignIn} disabled={isLoading} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={isLoading ? "Signing Up..." : "Sign Up"} onPress={handleSignUp} disabled={isLoading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
  }
}); 