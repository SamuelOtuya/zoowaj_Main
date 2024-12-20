// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity,
//   Modal,
//   FlatList,
//   ScrollView,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import * as Progress from "react-native-progress";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
// import { updateProfileField } from "@/redux/slices/profileSlice";

// const ProfileDetailsOne = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { profileData } = useAppSelector((state) => state.profile);

//   const [gender, setGender] = useState(profileData.gender || "");
//   const [maritalStatus, setMaritalStatus] = useState(profileData.maritalStatus || "");
//   const [showGenderModal, setShowGenderModal] = useState(false);
//   const [showMaritalModal, setShowMaritalModal] = useState(false);

//   const genderOptions = ["Male", "Female"];
//   const maritalOptions = ["Single", "Divorced", "Widowed", "Separated"];

//   const saveField = (key: string, value: any) => {
//     dispatch(updateProfileField({ key, value }));
//   };

//   const handleNext = () => {
//     saveField("gender", gender);
//     saveField("maritalStatus", maritalStatus);
//     router.push("profileDetailsTwo"); // Navigate to screen 2
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View>
//         <Text style={styles.headerText}>About you</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder="First Name"
//             placeholderTextColor="#878787"
//             style={styles.input}
//             defaultValue={profileData.firstName || ""}
//             onChangeText={(value) => saveField("firstName", value)}
//           />
//           <TextInput
//             placeholder="Last Name"
//             placeholderTextColor="#878787"
//             style={styles.input}
//             defaultValue={profileData.lastName || ""}
//             onChangeText={(value) => saveField("lastName", value)}
//           />
//           <TouchableOpacity onPress={() => setShowGenderModal(true)} style={styles.selectInput}>
//             <Text style={gender ? styles.inputText : styles.placeholderText}>
//               {gender || "Your Gender"}
//             </Text>
//             <Icon name="arrow-drop-down" size={24} color="#878787" />
//           </TouchableOpacity>
//           <TextInput
//             placeholder="Date Of Birth"
//             placeholderTextColor="#878787"
//             style={styles.input}
//             defaultValue={profileData.dob || ""}
//             onChangeText={(value) => saveField("dob", value)}
//           />
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#878787"
//             style={styles.input}
//             defaultValue={profileData.email || ""}
//             onChangeText={(value) => saveField("email", value)}
//           />
//           <TextInput
//             placeholder="Phone Number"
//             placeholderTextColor="#878787"
//             style={styles.input}
//             defaultValue={profileData.phoneNumber || ""}
//             onChangeText={(value) => saveField("phoneNumber", value)}
//           />
//           <TouchableOpacity onPress={() => setShowMaritalModal(true)} style={styles.selectInput}>
//             <Text style={maritalStatus ? styles.inputText : styles.placeholderText}>
//               {maritalStatus || "Marital Status"}
//             </Text>
//             <Icon name="arrow-drop-down" size={24} color="#878787" />
//           </TouchableOpacity>
//         </View>

//         {/* Gender Modal */}
//         <Modal visible={showGenderModal} transparent={true} animationType="slide">
//           <View style={styles.modalContainer}>
//             <FlatList
//               data={genderOptions}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setGender(item);
//                     setShowGenderModal(false);
//                   }}
//                 >
//                   <Text style={styles.modalItem}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               keyExtractor={(item) => item}
//             />
//           </View>
//         </Modal>

//         {/* Marital Status Modal */}
//         <Modal visible={showMaritalModal} transparent={true} animationType="slide">
//           <View style={styles.modalContainer}>
//             <FlatList
//               data={maritalOptions}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setMaritalStatus(item);
//                     setShowMaritalModal(false);
//                   }}
//                 >
//                   <Text style={styles.modalItem}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               keyExtractor={(item) => item}
//             />
//           </View>
//         </Modal>

//         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//           <Text style={styles.nextButtonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "white" },
//   headerText: { fontSize: 18, padding: 16, fontWeight: "600" },
//   inputContainer: { padding: 16 },
//   input: { borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 8 },
//   selectInput: { borderWidth: 1, marginBottom: 12, padding: 8, flexDirection: "row", justifyContent: "space-between" },
//   inputText: { color: "black" },
//   placeholderText: { color: "#878787" },
//   modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
//   modalItem: { padding: 12, backgroundColor: "white", marginBottom: 1 },
//   nextButton: { padding: 12, backgroundColor: "#43CEBA", borderRadius: 8, alignItems: "center" },
//   nextButtonText: { color: "white", fontWeight: "600" },
// });

// export default ProfileDetailsOne;
