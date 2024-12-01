import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAppDispatch } from '@/redux/hooks/redux-hooks';
import { useRouter } from 'expo-router';
import { updateProfileField } from '@/redux/slices/profileSlice';
import { useSelector } from 'react-redux';

const MAX_INTERESTS = 5;

const interests = [
  'Photography', 'Shopping', 'Karaoke', 'Yoga', 'Cooking',
  'Tennis', 'Running', 'Swimming', 'Art', 'Travelling',
  'Extreme Sports', 'Music', 'Drinking', 'Video Games',
];

export default function Screen2() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const profileData = useSelector((state: any) => state.profile.data);
  // console.log(`Profile Data 2: ${JSON.stringify(profileData, null, 2)}`)

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      } else if (prev.length < MAX_INTERESTS) {
        return [...prev, interest];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    dispatch(updateProfileField({ key: 'interests', value: selectedInterests }));
    console.log(`Profile Data 2: ${JSON.stringify(profileData, null, 2)}`)
    router.push('/(profile-details)/profileDetailsthree');
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.button,
        selectedInterests.includes(item) && styles.selectedButton,
      ]}
      onPress={() => handleInterestChange(item)}
    >
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Interests:</Text>
      <Text style={styles.counter}>
        Selected: {selectedInterests.length} / {MAX_INTERESTS}
      </Text>
      <FlatList
        data={interests}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      <Button 
        title="Next" 
        onPress={handleSubmit} 
        disabled={selectedInterests.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counter: {
    fontSize: 16,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    margin: 5,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#4CAF50', // Green when selected
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});