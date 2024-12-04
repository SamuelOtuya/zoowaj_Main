import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean; // To show the ActivityIndicator
  disabled?: boolean; // To disable the button
};

export default function Button({ title, onPress, loading, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, disabled && styles.buttonDisabled]}
      disabled={disabled} // Disables the button when needed
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6', // equivalent to bg-blue-500
    width: '100%',
    padding: 12, // equivalent to p-3
    alignItems: 'center',
    borderRadius: 8, // equivalent to rounded-md
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc', // equivalent to bg-blue-300 for disabled state
  },
  buttonText: {
    color: '#ffffff', // equivalent to text-white
    fontWeight: '600', // equivalent to font-semibold
  },
});
