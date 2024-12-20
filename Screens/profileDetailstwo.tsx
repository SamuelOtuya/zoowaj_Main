// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import * as Progress from "react-native-progress";

// const ReligiosityDetails = () => {
//   const router = useRouter();

//   // Define specific types for state values
//   const [sect, setSect] = useState<string | null>(null);
//   const [convert, setConvert] = useState<string | null>(null);
//   const [practice, setPractice] = useState<string | null>(null);
//   const [prayer, setPrayer] = useState<string | null>(null);
//   const [diet, setDiet] = useState<string | null>(null);
//   const [smoke, setSmoke] = useState<string | null>(null);
//   const [tattoos, setTattoos] = useState<string | null>(null);

//   const [showSectModal, setShowSectModal] = useState<boolean>(false);
//   const [showConvertModal, setShowConvertModal] = useState<boolean>(false);
//   const [showPracticeModal, setShowPracticeModal] = useState<boolean>(false);
//   const [showPrayerModal, setShowPrayerModal] = useState<boolean>(false);
//   const [showDietModal, setShowDietModal] = useState<boolean>(false);
//   const [showSmokeModal, setShowSmokeModal] = useState<boolean>(false);
//   const [showTattoosModal, setShowTattoosModal] = useState<boolean>(false);

//   const sectOptions = ['Sunni', 'Shia', 'Other'];
//   const convertOptions = ['Yes', 'No'];
//   const practiceOptions = ['Very Practicing', 'Moderately Practicing', 'Not Practicing'];
//   const prayerOptions = ['Yes', 'No', 'Sometimes'];
//   const dietOptions = ['Halal Only', 'Halal and Non-Halal', 'Vegetarian', 'Vegan'];
//   const smokeOptions = ['Yes', 'No', 'Occasionally'];
//   const tattoosOptions = ['Yes', 'No'];

//   const renderSelectInput = (value: string | null, placeholder: string, onPress: () => void, iconName: string) => (
//     <TouchableOpacity onPress={onPress} style={styles.selectInput}>
//       <Icon name={iconName} size={24} color="#878787" style={styles.icon} />
//       <Text style={value ? styles.inputText : styles.placeholderText}>
//         {value || placeholder}
//       </Text>
//       <Icon name="arrow-drop-down" size={24} color="#878787" />
//     </TouchableOpacity>
//   );

//   const renderModalItem = ({ item, onPress }: { item: string; onPress: (selected: string) => void }) => (
//     <TouchableOpacity style={styles.modalItem} onPress={() => onPress(item)}>
//       <Text style={styles.modalItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View>
//         <Text style={styles.headerText}>Religiosity</Text>
//         <View style={styles.inputContainer}>
//           {renderSelectInput(sect, 'Muslim Sect', () => setShowSectModal(true), 'group')}
//           {renderSelectInput(convert, 'Are you a convert/revert?', () => setShowConvertModal(true), 'compare-arrows')}
//           {renderSelectInput(practice, 'Your Religious Practice', () => setShowPracticeModal(true), 'spa')}
//           {renderSelectInput(prayer, 'Do you Pray?', () => setShowPrayerModal(true), 'accessibility')}
//           {renderSelectInput(diet, 'What is your Diet?', () => setShowDietModal(true), 'restaurant')}
//           {renderSelectInput(smoke, 'Do you Smoke?', () => setShowSmokeModal(true), 'smoking-rooms')}
//           {renderSelectInput(tattoos, 'Do you have any Tattoos?', () => setShowTattoosModal(true), 'brush')}
//         </View>

//         {/* Modals */}
//         <Modal visible={showSectModal} transparent={true} animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Select Sect</Text>
//               <FlatList
//                 data={sectOptions}
//                 renderItem={({ item }) => renderModalItem({
//                   item,
//                   onPress: (selectedSect) => {
//                     setSect(selectedSect);
//                     setShowSectModal(false);
//                   }
//                 })}
//                 keyExtractor={(item) => item}
//               />
//               <TouchableOpacity style={styles.closeButton} onPress={() => setShowSectModal(false)}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* Other modals for Convert, Practice, Prayer, Diet, Smoke, Tattoos */}
//         {/* (Follow similar pattern as above for the remaining modals) */}

//       </View>

//       {/* Progress bar */}
//       <Progress.Bar progress={0.4} width={null} color="green" />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 16,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   selectInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: '#ddd',
//     marginBottom: 12,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   placeholderText: {
//     color: '#878787',
//     flex: 1,
//   },
//   inputText: {
//     flex: 1,
//     color: '#333',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: 300,
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 8,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   modalItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   modalItemText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   closeButton: {
//     marginTop: 16,
//     paddingVertical: 12,
//     backgroundColor: '#007bff',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default ReligiosityDetails;
