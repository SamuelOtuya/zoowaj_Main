import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";
import { useRouter } from "expo-router";
import { updateProfileField } from "@/redux/slices/profileSlice";
import { useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select"; // Dropdown package
import DateTimePicker from "@react-native-community/datetimepicker"; // Date picker package

export default function Screen1() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [height, setHeight] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [tagline, setTagline] = useState("");

  const profileData = useSelector((state: any) => state.profile.data);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setBirthDate(selectedDate);
  };

  const handleSubmit = () => {
    const updatedProfile = {
      first_name: firstName,
      last_name: lastName,
      username,
      phone_number: phoneNumber,
      birthDate: birthDate.toISOString().split("T")[0],
      height,
      maritalStatus: maritalStatus.trim(),
      tagline,
    };

    dispatch(updateProfileField({ key: "about", value: updatedProfile }));
    console.log(`Profile Data: ${JSON.stringify(profileData, null, 2)}`);
    console.log(`Updated Data: ${JSON.stringify(updatedProfile, null, 2)}`);
    router.push("/(profile-details)/step-2");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          placeholder="Enter your first name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          placeholder="Enter your last name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Choose a username"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Birth Date:</Text>
        <Text
          style={styles.dateText}
          onPress={() => setShowDatePicker(true)}
        >
          {birthDate.toDateString()}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Height:</Text>
        <TextInput
          value={height}
          onChangeText={setHeight}
          style={styles.input}
          placeholder="Enter your height"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Marital Status:</Text>
        <RNPickerSelect
          onValueChange={(value) => setMaritalStatus(value)}
          items={[
            { label: "Single", value: "Single" },
            { label: "Married", value: "Married" },
            { label: "Divorced", value: "Divorced" },
            { label: "Widowed", value: "Widowed" },
          ]}
          placeholder={{ label: "Select Marital Status", value: null }}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
          }}
        />

        <Text style={styles.label}>Tagline:</Text>
        <TextInput
          value={tagline}
          onChangeText={setTagline}
          style={styles.input}
          placeholder="Write a catchy tagline"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    fontSize: 16,
    color: "#333",
  },
  dateText: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
