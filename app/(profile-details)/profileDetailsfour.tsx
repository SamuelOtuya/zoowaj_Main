import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useAppDispatch } from '@/redux/hooks/redux-hooks';
import { useRouter } from 'expo-router';
import { saveProfileDetailsService } from '../../redux/services/profileservice';
import { updateProfileField } from '@/redux/slices/profileSlice';
import { useSelector } from 'react-redux';

export default function Screen4() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [lookingToMarry, setLookingToMarry] = useState('');
  const [willingToRelocate, setWillingToRelocate] = useState('');
  const [wantsChildren, setWantsChildren] = useState('');
  const [livingArrangements, setLivingArrangements] = useState('');
  const [iceBreaker, setIceBreaker] = useState('');

  const profileData = useSelector(async (state: any) => await state.profile.data);
  // console.log(`Profile Data 4: ${JSON.stringify(profileData, null, 2)}`)

  const handleSubmit = () => {
    const marriageIntentions = {
      lookingToMarry,
      willingToRelocate,
      wantsChildren,
      livingArrangements,
      iceBreaker,
    };
    dispatch(updateProfileField({ key: 'marriageIntentions', value: marriageIntentions }));
    console.log(`Profile Data 4: ${JSON.stringify(profileData, null, 2)}`)
    router.push('/(profile-details)/profileDetailsFive');
  };

  return (
    <View style={styles.container}>
      <Text>Looking to Marry:</Text>
      <RNPickerSelect
        onValueChange={(value) => setLookingToMarry(value)}
        items={[
          { label: 'Within 1 year', value: 'Within 1 year' },
          { label: '1-2 years', value: '1-2 years' },
          { label: '2-3 years', value: '2-3 years' },
          { label: '3-5 years', value: '3-5 years' },
        ]}
        placeholder={{ label: 'Select your timeframe', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Willing to Relocate:</Text>
      <RNPickerSelect
        onValueChange={(value) => setWillingToRelocate(value)}
        items={[
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
          { label: 'Maybe', value: 'Maybe' },
        ]}
        placeholder={{ label: 'Select an option', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Wants Children:</Text>
      <RNPickerSelect
        onValueChange={(value) => setWantsChildren(value)}
        items={[
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
          { label: 'Maybe', value: 'Maybe' },
        ]}
        placeholder={{ label: 'Select an option', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Living Arrangements:</Text>
      <RNPickerSelect
        onValueChange={(value) => setLivingArrangements(value)}
        items={[
          { label: 'Living alone', value: 'Living alone' },
          { label: 'Living with family', value: 'Living with family' },
          { label: 'Living with roommates', value: 'Living with roommates' },
        ]}
        placeholder={{ label: 'Select an arrangement', value: null }}
        style={pickerSelectStyles}
      />

      <Text>Ice Breaker (Max 120 characters):</Text>
      <TextInput
        value={iceBreaker}
        onChangeText={setIceBreaker}
        style={styles.input}
        maxLength={120}
      />

      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
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
