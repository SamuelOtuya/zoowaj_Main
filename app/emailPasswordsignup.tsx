import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { supabase } from './lib/supabase';
import Button from './components/Button';
import { postData } from '@/hooks/useApi';
import { loginUrl, register } from '@/constants/api';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userData = {
    email: email,
    password: password,
  }

  async function signInWithEmail() {
    setLoading(true);
    try {
      const response = await postData(`${loginUrl}`, userData)
    } catch (error: any) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    try {
      const response  = await postData(`${register}`, userData);
    } catch (error: any) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          // disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
        
          title="Sign up"
          // disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    borderColor: '#d1d5db', // equivalent to border-gray-300
    borderWidth: 1,
    padding: 12, // equivalent to p-3
    borderRadius: 8, // equivalent to rounded-md
  },
});
