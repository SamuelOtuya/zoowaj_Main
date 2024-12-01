import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useAppDispatch } from '@/redux/hooks/redux-hooks';
import { useRouter } from 'expo-router';
import { saveProfileDetailsService } from '../../redux/services/profileservice';
import { updateProfileField } from '@/redux/slices/profileSlice';
import { useSelector } from 'react-redux';

export default function Screen5() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [languages, setLanguages] = useState('');
  const [ethnicGroup, setEthnicGroup] = useState('');
  const [ethnicOrigin, setEthnicOrigin] = useState('');
  const [biography, setBiography] = useState('');

  const profileData = useSelector((state: any) => state.profile.data);
  // console.log(`Profile Data 5: ${JSON.stringify(profileData, null, 2)}`)

  const handleSubmit = () => {
    const languageAndEthnicity = {
      languages,
      ethnicGroup,
      ethnicOrigin,
      biography,
    };
    dispatch(updateProfileField({ key: 'languageAndEthnicity', value: languageAndEthnicity }));
    console.log(`Profile Data 5: ${JSON.stringify(profileData, null, 2)}`)
    router.push('/(profile-details)/profileDetailsSix');
  };

  return (
    <View style={styles.container}>
      <Text>Languages:</Text>
      <RNPickerSelect
        onValueChange={(value) => setLanguages(value)}
        items={[
          { label: 'English', value: 'English' },
          { label: 'Arabic', value: 'Arabic' },
          { label: 'Urdu', value: 'Urdu' },
          { label: 'Bengali', value: 'Bengali' },
          { label: 'Other', value: 'Other' },
        ]}
        placeholder={{ label: 'Select a language', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Ethnic Group:</Text>
      <RNPickerSelect
        onValueChange={(value) => setEthnicGroup(value)}
        items={[
          { label: 'Asian', value: 'Asian' },
          { label: 'Black', value: 'Black' },
          { label: 'Hispanic', value: 'Hispanic' },
          { label: 'Middle Eastern', value: 'Middle Eastern' },
          { label: 'White', value: 'White' },
          { label: 'Other', value: 'Other' },
        ]}
        placeholder={{ label: 'Select an ethnic group', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Ethnic Origin:</Text>
      <RNPickerSelect
        onValueChange={(value) => setEthnicOrigin(value)}
        items={[
          { label: 'Indian', value: 'Indian' },
          { label: 'Pakistani', value: 'Pakistani' },
          { label: 'Bangladeshi', value: 'Bangladeshi' },
          { label: 'Arab', value: 'Arab' },
          { label: 'Turkish', value: 'Turkish' },
          { label: 'Other', value: 'Other' },
        ]}
        placeholder={{ label: 'Select an ethnic origin', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Biography (Max 500 characters):</Text>
      <TextInput
        value={biography}
        onChangeText={setBiography}
        style={styles.input}
        maxLength={500}
        multiline
      />

      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    textAlignVertical: 'top', // Ensures proper multiline behavior
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    marginBottom: 10,
  },
};
