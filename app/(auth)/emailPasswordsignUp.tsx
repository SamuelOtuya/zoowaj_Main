import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux-hooks';
import { registerUserService } from '@/redux/services/authservice';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

export default function Auth() {
  const dispatch = useAppDispatch();
  const { isloading, error, login, details } = useAppSelector((state) => state.auth); // Type should be inferred now
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function signUpWithEmail() {
    if (!email || !password) {
        return Alert.alert('Empty fields', 'Email and password are required.');
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim().toLowerCase())) {
        return Alert.alert('Invalid email', 'Please enter a valid email address.');
    }

    if (password.length < 8) {
        return Alert.alert('Password too short', 'Password must be at least 8 characters long.');
    }

    const userData = { email, password };
    await dispatch(registerUserService(userData));

    // Check the Redux state after signup
    const { login, details, error } = useAppSelector(state => state.auth);

    if (error) {
        Alert.alert('Error', error);
        console.log(error, "=============");
        return;
    }

    if (login && !details) {
        router.push('/(profile-details)/profileDetailsone');
    } else if (login && details) {
        router.push('/(main)');
    }
}


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
        />
        <Button title={isloading ? 'Processing...' : 'Sign Up'} onPress={signUpWithEmail} />
        <TouchableOpacity onPress={() => router.push('/(auth)/Login')} style={styles.touchableOpacity}>
          <Text style={styles.touchableText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  scrollview: {
    paddingBottom: 30,
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    gap: 25,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#d1d5db',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    width: 300,
  },
  touchableOpacity: {
    marginTop: 20,
    alignItems: 'center',
  },
  touchableText: {
    color: '#1E90FF',
  },
});
