import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useAppDispatch } from "@/redux/hooks/redux-hooks";
import { useRouter } from "expo-router";
import { updateProfileField } from "@/redux/slices/profileSlice";
import { useSelector } from "react-redux";

export default function Screen6() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [profession, setProfession] = useState("");
  const [education, setEducation] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const profileData = useSelector((state: any) => state.profile.data);

  const handleSubmit = () => {
    const educationAndCareer = { profession, education, jobTitle };
    dispatch(
      updateProfileField({
        key: "educationAndCareer",
        value: educationAndCareer,
      })
    );
    console.log(`Profile Data 6: ${JSON.stringify(profileData, null, 2)}`);
    router.push("/(profile-details)/step-7");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Education and Career</Text>

        <Text style={styles.label}>Profession:</Text>
        <RNPickerSelect
          onValueChange={(value) => setProfession(value)}
          items={[
            { label: "Doctor", value: "Doctor" },
            { label: "Engineer", value: "Engineer" },
            { label: "Teacher", value: "Teacher" },
            { label: "Business", value: "Business" },
            { label: "Other", value: "Other" },
          ]}
          placeholder={{ label: "Select a profession", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Education Level:</Text>
        <RNPickerSelect
          onValueChange={(value) => setEducation(value)}
          items={[
            { label: "High School", value: "High School" },
            { label: "Bachelor's", value: "Bachelor's" },
            { label: "Master's", value: "Master's" },
            { label: "PhD", value: "PhD" },
            { label: "Other", value: "Other" },
          ]}
          placeholder={{ label: "Select education level", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Job Title:</Text>
        <RNPickerSelect
          onValueChange={(value) => setJobTitle(value)}
          items={[
            { label: "Manager", value: "Manager" },
            { label: "Developer", value: "Developer" },
            { label: "Designer", value: "Designer" },
            { label: "Analyst", value: "Analyst" },
            { label: "Other", value: "Other" },
          ]}
          placeholder={{ label: "Select a job title", value: null }}
          style={pickerSelectStyles}
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
    backgroundColor: "#f9f9f9",
    paddingBottom: 20,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#333",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#333",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
};
