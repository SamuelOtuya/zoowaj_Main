import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useAppDispatch } from '@/redux/hooks/redux-hooks';
import { useRouter } from 'expo-router';
import { saveProfileDetailsService } from '../../redux/services/profileservice';
import { updateProfileField } from '@/redux/slices/profileSlice';
import { useSelector } from 'react-redux';

export default function Screen6() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [profession, setProfession] = useState('');
  const [education, setEducation] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const profileData = useSelector((state: any) => state.profile.data);
  // console.log(`Profile Data 6: ${JSON.stringify(profileData, null, 2)}`)

  const handleSubmit = () => {
    const educationAndCareer = { profession, education, jobTitle };
    dispatch(updateProfileField({ key: 'educationAndCareer', value: educationAndCareer }));
    console.log(`Profile Data 6: ${JSON.stringify(profileData, null, 2)}`)
    router.push('/(profile-details)/profileDetailsSeven');
  };

  return (
    <View style={styles.container}>
      <Text>Profession:</Text>
      <RNPickerSelect
        onValueChange={(value) => setProfession(value)}
        items={[
          { label: 'Doctor', value: 'Doctor' },
          { label: 'Engineer', value: 'Engineer' },
          { label: 'Teacher', value: 'Teacher' },
          { label: 'Business', value: 'Business' },
          { label: 'Other', value: 'Other' },
        ]}
        placeholder={{ label: 'Select a profession', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Education Level:</Text>
      <RNPickerSelect
        onValueChange={(value) => setEducation(value)}
        items={[
          { label: 'High School', value: 'High School' },
          { label: "Bachelor's", value: "Bachelor's" },
          { label: "Master's", value: "Master's" },
          { label: 'PhD', value: 'PhD' },
          { label: 'Other', value: 'Other' },
        ]}
        placeholder={{ label: 'Select education level', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Job Title:</Text>
      <RNPickerSelect
        onValueChange={(value) => setJobTitle(value)}
        items={[
          { label: 'Manager', value: 'Manager' },
          { label: 'Developer', value: 'Developer' },
          { label: 'Designer', value: 'Designer' },
          { label: 'Analyst', value: 'Analyst' },
          { label: 'Other', value: 'Other' },
        ]}
        placeholder={{ label: 'Select a job title', value: null }}
        style={pickerSelectStyles}
      />

      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
