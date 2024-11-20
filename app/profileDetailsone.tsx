import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from "react-native-progress"

const ProfileDetailsone = () => {
  const router = useRouter()
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [children, setChildren] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showMaritalModal, setShowMaritalModal] = useState(false);
  const [showChildrenModal, setShowChildrenModal] = useState(false);


  const genderOptions = [
    { label: 'Male', icon: 'male', value: 'male' },
    { label: 'Female', icon: 'female', value: 'female' },

  ];

  const maritalOptions = [
    'Single',  'Divorced', 'Widowed', 'Separated'
  ];

  const childrenOptions = [
    'No children', '1 child', '2 children', '3 children', '4 or more children'
  ];

  const renderSelectInput = (value, placeholder, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.selectInput}>
      <Text style={value ? styles.inputText : styles.placeholderText}>
        {value || placeholder}
      </Text>
      <Icon name="arrow-drop-down" size={24} color="#878787" />
    </TouchableOpacity>
  );

  const renderModalItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.modalItem} onPress={() => onPress(item)}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.headerText}>About you</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder='First Name' placeholderTextColor={'#878787'} style={styles.input} />
          <TextInput placeholder='Last Name' placeholderTextColor={'#878787'} style={styles.input} />

          {renderSelectInput(gender, 'Your Gender', () => setShowGenderModal(true))}

          <TextInput
            placeholder='Date Of birth'
            placeholderTextColor={'#878787'}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder='Email'
            placeholderTextColor={'#878787'}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder='Phone Number'
            placeholderTextColor={'#878787'}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <TextInput
            placeholder='Your Height'
            placeholderTextColor={'#878787'}
            style={styles.input}
            keyboardType="numeric"
          />

          {renderSelectInput(maritalStatus, 'Marital Status', () => setShowMaritalModal(true))}

          {/* {renderSelectInput(children, 'Do you have any children?', () => setShowChildrenModal(true))} */}

          <TextInput
            placeholder='Tagline'
            placeholderTextColor={'#878787'}
            style={[styles.input, styles.taglineInput]}
            multiline={true}
            numberOfLines={3}
          />
        </View>

        {/* Gender Modal */}
        <Modal visible={showGenderModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <FlatList
                data={genderOptions}
                renderItem={({ item }) => renderModalItem({
                  item: item.label,
                  onPress: (selectedGender) => {
                    setGender(selectedGender);
                    setShowGenderModal(false);
                  }
                })}
                keyExtractor={(item) => item.value}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowGenderModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Marital Status Modal */}
        <Modal visible={showMaritalModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Marital Status</Text>
              <FlatList
                data={maritalOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedStatus) => {
                    setMaritalStatus(selectedStatus);
                    setShowMaritalModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowMaritalModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Children Modal */}
        <Modal visible={showChildrenModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Do you have children?</Text>
              <FlatList
                data={childrenOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedOption) => {
                    setChildren(selectedOption);
                    setShowChildrenModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowChildrenModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={{ width: 95, backgroundColor: '#43CEBA', display: 'flex', paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, borderRadius: 14, marginTop: 20, gap: 10, alignSelf: 'flex-end', marginRight: 16 }} onPress={() => router.push('profileDetailstwo',)} >
          <Text style={{ fontWeight: 'semibold', fontSize: 14, color: 'white', }} >
            Next
          </Text>
        </TouchableOpacity>

        {/* progress bar */}
        <View style={{ paddingHorizontal:16,  marginTop: 20, marginBottom:40 }} >
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'semibold' }}>1/7</Text>
          <Progress.Bar progress={0.14} unfilledColor='#E9E9E9' borderColor='#e9e9e9' width={null} borderRadius={52}  height={10} color='#43CEBA' />
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 18,
    paddingLeft: 25,
    marginTop: 12,
    fontWeight: '600',
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    paddingBottom: 20,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#878787',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    height: 44,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#878787',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    height: 44,
  },
  inputText: {
    color: 'black',
    fontSize: 14,
  },
  placeholderText: {
    color: '#878787',
    fontSize: 14,
  },
  taglineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileDetailsone;