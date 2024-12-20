// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import Button from '../components/Button'; // Importing your custom Button
// import { postData } from '@/hooks/useApi';
// import { loginUrl, register } from '@/constants/api';
// import { useRouter } from 'expo-router';

// export default function Auth() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const userData = {
//     name,
//     email,
//     password,
//   };

//   async function signUpWithEmail() {
//     // Check if all details are available
//     if (!name || !email || !password || !confirmPassword) {
//       return Alert.alert('Empty fields', 'All fields are required to create an account.');
//     }

//     // Check if email is valid
//     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim().toLowerCase())) {
//       return Alert.alert('Invalid email', 'Please enter a valid email address.');
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       return Alert.alert('Password mismatch', 'Passwords do not match.');
//     }

//     setLoading(true);
//     try {
//       const response = await postData(`${register}`, userData);
//       Alert.alert('Sign up successful!');
//     } catch (error: any) {
//       Alert.alert(error.message || 'An error occurred.');
//     }
//     setLoading(false);
//   }

//   async function signInWithEmail() {
//     setLoading(true);
//     try {
//       const response = await postData(`${loginUrl}`, { email, password });
//       Alert.alert('Sign in successful!');
//       router.push('/profileDetailsone');
//     } catch (error: any) {
//       Alert.alert(error.message || 'An error occurred.');
//     }
//     setLoading(false);
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.verticallySpaced}>
//         <TextInput
//           onChangeText={setName}
//           value={name}
//           placeholder="Full Name"
//           autoCapitalize="words"
//           style={styles.input}
//         />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <TextInput
//           onChangeText={setEmail}
//           value={email}
//           placeholder="email@address.com"
//           autoCapitalize="none"
//           style={styles.input}
//         />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <TextInput
//           onChangeText={setPassword}
//           value={password}
//           secureTextEntry
//           placeholder="Password"
//           autoCapitalize="none"
//           style={styles.input}
//         />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <TextInput
//           onChangeText={setConfirmPassword}
//           value={confirmPassword}
//           secureTextEntry
//           placeholder="Confirm Password"
//           autoCapitalize="none"
//           style={styles.input}
//         />
//       </View>

//       <View style={styles.verticallySpaced}>
//         <Button
//           title="Sign Up"
//           onPress={signUpWithEmail}
//           disabled={loading}
//         />
//       </View>

//       <View style={styles.verticallySpaced}>
//         <Button
//           title="Sign In"
//           onPress={signInWithEmail}
//           disabled={loading}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     padding: 12,
//   },
//   verticallySpaced: {
//     marginVertical: 10,
//   },
//   input: {
//     backgroundColor: 'white',
//     borderColor: '#d1d5db',
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 8,
//     width: '100%',
//   },
// });

